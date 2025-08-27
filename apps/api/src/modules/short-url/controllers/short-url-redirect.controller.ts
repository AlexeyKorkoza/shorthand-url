import { Controller, Get, Ip, Param, Redirect } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ShortUrlService } from '@/modules/short-url/services/short-url.service';
import { AnalyticsService } from '@/modules/short-url/services/analytics.service';

@ApiTags('Redirect')
@Controller()
export class ShortUrlRedirectController {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get(':alias')
  @Redirect()
  @ApiOkResponse({ description: 'Redirects to the original URL' })
  async redirectToOriginalUrl(
    @Param('alias') alias: Alias,
    @Ip() ipAddress: string,
  ): Promise<{ url: string }> {
    const result =
      await this.shortUrlService.findOriginalUrlAndUpdateClickCount(alias);
    const { id: shortUrlId, originalUrl } = result;

    await this.analyticsService.saveIpAddress({
      shortUrlId,
      ipAddress,
    });

    return { url: originalUrl };
  }
}
