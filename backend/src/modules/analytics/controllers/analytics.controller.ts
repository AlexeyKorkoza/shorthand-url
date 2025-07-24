import { Controller, Get, Param } from '@nestjs/common';

import { AnalyticsService } from '../services/analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getShortUrlAnalytics(@Param('shortUrl') shortUrl: UniqueShortUrl) {
    return this.analyticsService.getShortUrlAnalytics(shortUrl);
  }
}
