import { RabbitMQConfig } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { type AppConfig } from "@/core/interfaces";

@Injectable()
export class RabbitMQConfigService implements RabbitMQConfig {
  readonly uri;

  constructor(private readonly configService: ConfigService<AppConfig>) {
    this.uri = configService.get("rabbitmq.url", {
      infer: true,
    });
  }

  createConfig(): RabbitMQConfig {
    return {
      connectionInitOptions: { wait: true, timeout: 30000 },
      exchanges: [
        {
          name: "exchange1",
          type: "direct",
          options: { durable: true },
        },
      ],
      queues: [
        {
          name: "subscribe-queue",
        },
      ],
      exchangeBindings: [],
      uri: this.uri,
      enableControllerDiscovery: true,
    };
  }
}
