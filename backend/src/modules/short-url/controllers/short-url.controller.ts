import { ShortUrl } from '@prisma/client';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import {
  type CreateShortUrlDto,
  type GetShortUrlInfoDto,
} from '@/modules/short-url/dtos';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get('/list')
  getAllShortUrls(): Promise<ShortUrl[]> {
    return this.shortUrlService.getAllShortUrls();
  }

  @Post('/shorten')
  createShortUrl(@Body() body: CreateShortUrlDto): Promise<string> {
    return this.shortUrlService.createShortUrl(body);
  }

  @Get()
  redirectToOriginalUrl(
    @Param('shortUrl') shortUrl: UniqueShortUrl,
  ): Promise<string> {
    return this.shortUrlService.findOriginalUrlAndUpdateClickCount(shortUrl);
  }

  @Get('/info/:shortUrl')
  getShortUrlInformation(
    @Param('shortUrl') shortUrl: UniqueShortUrl,
  ): Promise<GetShortUrlInfoDto> {
    return this.shortUrlService.getShortUrlInformation(shortUrl);
  }

  @Delete('/delete/:shortUrl')
  deleteShortUrl(
    @Param('shortUrl') shortUrl: UniqueShortUrl,
  ): Promise<ShortUrl> {
    return this.shortUrlService.deleteShortUrl(shortUrl);
  }
}
