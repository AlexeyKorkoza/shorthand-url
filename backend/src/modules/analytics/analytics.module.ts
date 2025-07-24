import { Module } from '@nestjs/common';

import { AnalyticsController } from '@/modules/analytics/controllers/analytics.controller';
import { AnalyticsService } from '@/modules/analytics/services/analytics.service';
import { AnalyticsRepository } from '@/modules/analytics/repositories/analytics.repository';
import { ShortUrlRepository } from '@/modules/short-url/repositories/short-url.repository';
import { PrismaService } from '@/services/prisma.service';

@Module({
  // imports: [ShortUrlModule],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsRepository,
    AnalyticsService,
    PrismaService,
    ShortUrlRepository,
  ],
})
export class AnalyticsModule {}
