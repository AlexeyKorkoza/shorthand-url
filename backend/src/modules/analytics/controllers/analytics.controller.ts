import { Controller, Get, Param } from '@nestjs/common';

import { AnalyticsService } from '@/modules/analytics/services/analytics.service';
import { type GetAnalyticsDto } from '@/modules/analytics/dtos';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getShortUrlAnalytics(
    @Param('shortUrl') shortUrl: UniqueShortUrl,
  ): Promise<GetAnalyticsDto> {
    return this.analyticsService.getShortUrlAnalytics(shortUrl);
  }
}
