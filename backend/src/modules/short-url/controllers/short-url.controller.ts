import { ShortUrl } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import {
  type CreateShortUrlDto,
  type CreateShortUrlResponseDto,
  type GetShortUrlInfoDto,
  type GetAnalyticsDto,
} from '@/modules/short-url/dtos';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';
import { AnalyticsService } from '@/modules/short-url/services/analytics.service';

@Controller('url')
export class ShortUrlController {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get('/list')
  getAllShortUrls(): Promise<ShortUrl[]> {
    return this.shortUrlService.getAllShortUrls();
  }

  @Post('/shorten')
  createShortUrl(
    @Body() body: CreateShortUrlDto,
  ): Promise<CreateShortUrlResponseDto> {
    return this.shortUrlService.createShortUrl(body);
  }

  @Get('/info/:shortUrl')
  getShortUrlInformation(
    @Param('shortUrl') shortUrl: UniqueShortUrl,
  ): Promise<GetShortUrlInfoDto> {
    return this.shortUrlService.getShortUrlInformation(shortUrl);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteShortUrl(@Param('id') id: string): Promise<void> {
    return this.shortUrlService.deleteShortUrl(id);
  }

  @Get('/analytics/:alias')
  getShortUrlAnalytics(@Param('alias') alias: Alias): Promise<GetAnalyticsDto> {
    return this.analyticsService.getShortUrlAnalytics(alias);
  }
}
