import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ShortUrlController } from '@/modules/short-url/controllers/short-url.controller';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';
import { ShortUrlRepository } from '@/modules/short-url/repositories/short-url.repository';
import { AnalyticsService } from '@/modules/short-url/services/analytics.service';
import { AnalyticsRepository } from '@/modules/short-url/repositories/analytics.repository';
import { ShortUrlRedirectController } from '@/modules/short-url/controllers/short-url-redirect.controller';
import { PrismaService } from '@/services/prisma.service';

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
