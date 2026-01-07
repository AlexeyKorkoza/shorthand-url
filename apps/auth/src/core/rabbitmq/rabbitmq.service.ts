import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, type Connection, type Channel } from 'amqplib';

import { type AppConfig } from '@/core/interfaces';

interface PublishOptions {
  exchange?: string;
  routingKey?: string;
  persistent?: boolean;
  headers?: Record<string, any>;
}

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: Connection;
  private channel: Channel;
  private isConnected = false;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;

  constructor(private readonly configService: ConfigService<AppConfig>) {
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      const url = this.configService.get<string>('rabbitmq.url', {
        infer: true,
      });

      this.connection = await connect(url);
      this.channel = await this.connection.createChannel();
      this.isConnected = true;
      this.reconnectAttempts = 0;

      this.logger.log('Connected to RabbitMQ');

      this.connection.on('error', (err) => {
        this.logger.error('RabbitMQ connection error:', err);
        this.isConnected = false;
        this.reconnect();
      });

      this.channel.on('error', (err) => {
        this.logger.error('RabbitMQ channel error:', err);
        this.isConnected = false;
        this.reconnect();
      });

      await this.setupExchanges();
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ:', error);
      this.reconnect();
    }
  }

  private async reconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.logger.error('Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

    this.logger.log(
      `Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`,
    );

    setTimeout(() => {
      this.connect().catch(async () => {
        await this.reconnect();
      });
    }, delay);
  }

  private async setupExchanges(): Promise<void> {
    await this.channel.assertExchange('events', 'topic', {
      durable: true,
      autoDelete: false,
    });

    await this.channel.assertExchange('events.dlx', 'topic', {
      durable: true,
      autoDelete: false,
    });
  }

  async publish(
    exchange: string,
    routingKey: string,
    message: any,
    options: PublishOptions = {},
  ): Promise<boolean> {
    if (!this.isConnected || !this.channel) {
      throw new Error('RabbitMQ not connected');
    }

    try {
      const buffer = Buffer.from(JSON.stringify(message));
      const defaultOptions = {
        persistent: true,
        contentType: 'application/json',
        timestamp: Date.now(),
        headers: {
          ...options.headers,
          'x-event-id': message.eventId || message.id,
          'x-event-type': message.type,
        },
      };

      return this.channel.publish(exchange, routingKey, buffer, {
        ...defaultOptions,
        ...options,
      });
    } catch (error) {
      this.logger.error('Failed to publish message:', error);
      throw error;
    }
  }

  async publishEvent(
    type: string,
    payload: any,
    aggregateId: string,
    aggregateType: string,
  ): Promise<boolean> {
    const event = {
      id: `${aggregateType}-${aggregateId}-${Date.now()}`,
      type,
      payload,
      aggregateId,
      aggregateType,
      timestamp: new Date().toISOString(),
      source: this.configService.get('SERVICE_NAME', 'unknown'),
    };

    const routingKey = `${aggregateType.toLowerCase()}.${type.toLowerCase()}`;

    return this.publish('events', routingKey, event, {
      persistent: true,
      headers: {
        'x-aggregate-id': aggregateId,
        'x-aggregate-type': aggregateType,
      },
    });
  }

  async createQueue(queueName: string, options: any = {}): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel not available');
    }

    const defaultOptions = {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': 'events.dlx',
        'x-dead-letter-routing-key': `${queueName}.dlq`,
      },
    };

    await this.channel.assertQueue(queueName, {
      ...defaultOptions,
      ...options,
    });

    const patterns = [`${queueName}.*`, `*.${queueName}.*`];

    for (const pattern of patterns) {
      await this.channel.bindQueue(queueName, 'events', pattern);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection:', error);
    }
  }
}
