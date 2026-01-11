import { Inject, Module, type OnModuleDestroy } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import type Redis from "ioredis";

import { REDIS_CLIENT } from "@/core/constants/symbols.constant";
import { RabbitmqModule } from "@/core/modules/rabbit.module";
import { RedisProvider } from "@/core/providers/redis.provider";
import { PrismaService } from "@/core/services/prisma.service";
import { TokenService } from "@/core/services/token.service";
import { UserSessionService } from "@/core/services/user-session.service";

@Module({
  imports: [ConfigModule, JwtModule.register({}), RabbitmqModule],
  providers: [RedisProvider, TokenService, UserSessionService, PrismaService],
  exports: [
    REDIS_CLIENT,
    TokenService,
    UserSessionService,
    PrismaService,
    RabbitmqModule,
  ],
})
export class CoreModule implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
