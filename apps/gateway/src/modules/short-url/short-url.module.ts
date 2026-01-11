import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "@/core/services/prisma.service";
import { ShortUrlController } from "@/modules/short-url/controllers/short-url.controller";
import { ShortUrlRedirectController } from "@/modules/short-url/controllers/short-url-redirect.controller";
import { AnalyticsRepository } from "@/modules/short-url/repositories/analytics.repository";
import { ShortUrlRepository } from "@/modules/short-url/repositories/short-url.repository";
import { AnalyticsService } from "@/modules/short-url/services/analytics.service";
import { ShortUrlService } from "@/modules/short-url/services/short-url.service";

@Module({
  imports: [ConfigModule],
  controllers: [ShortUrlController, ShortUrlRedirectController],
  providers: [
    AnalyticsService,
    AnalyticsRepository,
    ShortUrlService,
    ShortUrlRepository,
    PrismaService,
  ],
})
export class ShortUrlModule {}
