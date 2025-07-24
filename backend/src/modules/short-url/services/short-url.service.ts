import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Prisma, ShortUrl } from '@prisma/client';

import { ShortUrlRepository } from '@/modules/short-url/repositories/short-url.repository';
import {
  type CreateShortUrlDto,
  type GetShortUrlInfoDto,
} from '@/modules/short-url/dtos';

@Injectable()
export class ShortUrlService {
  constructor(private shortUrlRepository: ShortUrlRepository) {}

  private generateShortId(): string {
    return nanoid(7);
  }

  private buildShortUrl(alias: string): string {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    return `${baseUrl}/${alias}`;
  }

  async getAllShortUrls(): Promise<ShortUrl[]> {
    return this.shortUrlRepository.findAllShortUrls();
  }

  async findOriginalUrlAndUpdateClickCount(
    shortUrl: UniqueShortUrl,
  ): Promise<string> {
    return this.shortUrlRepository.findOriginalUrlAndUpdateClickCount(shortUrl);
  }

  async getShortUrlInformation(
    shortUrl: UniqueShortUrl,
  ): Promise<GetShortUrlInfoDto> {
    const where = {
      alias: shortUrl,
    };
    const result = await this.shortUrlRepository.findShortUrl(where);
    if (!result) {
      throw new HttpException('Short URL not found', HttpStatus.BAD_REQUEST);
    }

    return {
      clickCount: result.clickCount ?? 0,
      createdAt: result.createdAt,
      originalUrl: result.originalUrl,
    };
  }

  async createShortUrl(body: CreateShortUrlDto): Promise<string> {
    const { originalUrl, alias, expiredAt } = body;

    const finalAlias = alias ?? this.generateShortId();
    const where = {
      alias: finalAlias,
    };

    const result = await this.shortUrlRepository.findShortUrl(where);
    if (result) {
      throw new HttpException(
        'Short URL already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const shortUrl = this.buildShortUrl(finalAlias);
    const createShortUrlBody: Prisma.ShortUrlCreateInput = {
      alias: finalAlias,
      expiredAt: expiredAt ? new Date(expiredAt) : null,
      originalUrl,
      shortUrl,
    };

    await this.shortUrlRepository.createShortUrl(createShortUrlBody);

    return shortUrl;
  }

  async deleteShortUrl(shortUrl: UniqueShortUrl): Promise<ShortUrl> {
    return this.shortUrlRepository.deleteShortUrl(shortUrl);
  }
}
