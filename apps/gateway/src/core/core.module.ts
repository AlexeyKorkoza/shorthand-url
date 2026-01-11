import { Inject, Module, OnModuleDestroy } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Redis from "ioredis";

import { REDIS_CLIENT } from "@/core/constants/symbols.constant";
import { RabbitmqModule } from "@/core/modules/rabbit.module";
import { RedisProvider } from "@/core/providers/redis.provider";
import { PrismaService } from "@/core/services/prisma.service";

@Module({
  imports: [ConfigModule, RabbitmqModule],
  providers: [RedisProvider, PrismaService],
  exports: [REDIS_CLIENT, PrismaService, RabbitmqModule],
})
export class CoreModule implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
