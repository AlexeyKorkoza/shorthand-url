import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';

import { RedisProvider } from '@/core/providers/redis.provider';
import { REDIS_CLIENT } from '@/core/constants/symbols.constant';
import { RabbitMQModule } from '@/core/rabbitmq/rabbitmq.module';

@Module({
  imports: [ConfigModule, RabbitMQModule],
  providers: [RedisProvider],
  exports: [REDIS_CLIENT],
})
export class CoreModule implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
