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
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

import {
  CreateShortUrlDto,
  CreateShortUrlResponseDto,
  GetShortUrlInfoDto,
  GetAnalyticsDto,
  GetShortUrlDto,
} from '@/modules/short-url/dtos';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';
import { AnalyticsService } from '@/modules/short-url/services/analytics.service';

@ApiTags('Url')
@Controller('url')
export class ShortUrlController {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get('/list')
  @ApiOkResponse({ type: [GetShortUrlDto] })
  getAllShortUrls(): Promise<GetShortUrlDto[]> {
    return this.shortUrlService.getAllShortUrls();
  }

  @Post('/shorten')
  @ApiBody({ type: CreateShortUrlDto })
  @ApiOkResponse({ type: CreateShortUrlResponseDto })
  createShortUrl(
    @Body() body: CreateShortUrlDto,
  ): Promise<CreateShortUrlResponseDto> {
    return this.shortUrlService.createShortUrl(body);
  }

  @Get('/info/:shortUrl')
  @ApiOkResponse({ type: GetShortUrlInfoDto })
  getShortUrlInformation(
    @Param('shortUrl') shortUrl: UniqueShortUrl,
  ): Promise<GetShortUrlInfoDto> {
    return this.shortUrlService.getShortUrlInformation(shortUrl);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  deleteShortUrl(@Param('id') id: string): Promise<void> {
    return this.shortUrlService.deleteShortUrl(id);
  }

  @Get('/analytics/:alias')
  @ApiOkResponse({ type: GetAnalyticsDto })
  getShortUrlAnalytics(@Param('alias') alias: Alias): Promise<GetAnalyticsDto> {
    return this.analyticsService.getShortUrlAnalytics(alias);
  }
}
