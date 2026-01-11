import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import {
  EXCHANGE_KEYS,
  QUEUE_KEYS,
  ROUTING_KEYS,
} from "@/core/constants/rabbitmq.constant";
import { type AppConfig } from "@/core/interfaces";

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig>) => {
        const rabbitMQUri = configService.get("rabbitmq.url", {
          infer: true,
        });

        if (!rabbitMQUri) {
          throw new Error("RabbitMQ URL is required but not configured");
        }

        return {
          exchanges: [
            {
              name: EXCHANGE_KEYS.AUTH,
              type: "direct",
              options: { durable: true },
            },
          ],
          queues: [
            {
              name: QUEUE_KEYS.AUTH.SIGN_UP,
              exchange: EXCHANGE_KEYS.AUTH,
              routingKey: ROUTING_KEYS.AUTH.SIGN_UP,
            },
          ],
          uri: rabbitMQUri,
        };
      },
    }),
  ],
  providers: [],
  exports: [RabbitMQModule],
})
export class RabbitmqModule {}
