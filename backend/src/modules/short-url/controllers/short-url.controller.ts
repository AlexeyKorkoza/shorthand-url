import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { type CreateShortUrlDto } from '@/modules/short-url/dtos';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post('/shorten')
  createShortUrl(@Body() body: CreateShortUrlDto) {
    return this.shortUrlService.createShortUrl(body);
  }

  @Get()
  redirectToOriginalUrl(@Param('shortUrl') shortUrl: UniqueShortUrl) {
    return this.shortUrlService.findOriginalUrlAndUpdateClickCount(shortUrl);
  }

  @Get('/info/:shortUrl')
  getShortUrlInformation(@Param('shortUrl') shortUrl: UniqueShortUrl) {
    return this.shortUrlService.getShortUrlInformation(shortUrl);
  }

  @Delete('/delete/:shortUrl')
  deleteShortUrl(@Param('shortUrl') shortUrl: UniqueShortUrl) {
    return this.shortUrlService.deleteShortUrl(shortUrl);
  }
}
