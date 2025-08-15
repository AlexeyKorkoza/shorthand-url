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
  createShortUrl(
    @Body() body: CreateShortUrlDto,
  ): Promise<CreateShortUrlResponseDto> {
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

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteShortUrl(@Param('id') id: string): Promise<void> {
    return this.shortUrlService.deleteShortUrl(id);
  }
}
