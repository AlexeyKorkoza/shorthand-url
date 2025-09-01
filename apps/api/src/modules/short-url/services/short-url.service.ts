import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import * as PrismaPkg from '@prisma/client';

import { ShortUrlRepository } from '@/modules/short-url/repositories/short-url.repository';
import {
  CreateShortUrlDto,
  CreateShortUrlResponseDto,
  type GetShortUrlInfoDto,
  GetShortUrlDto,
} from '@/modules/short-url/dtos';

@Injectable()
export class ShortUrlService {
  constructor(
    private shortUrlRepository: ShortUrlRepository,
    private configService: ConfigService,
  ) {}

  private generateShortId(): string {
    return nanoid(7);
  }

  private buildShortUrl(alias: string): string {
    const baseUrl = this.configService.get('baseUrl') as string;

    return `${baseUrl}/${alias}`;
  }

  async getAllShortUrls(): Promise<GetShortUrlDto[]> {
    return this.shortUrlRepository.findAllShortUrls();
  }

  async findOriginalUrlAndUpdateClickCount(alias: Alias): Promise<PrismaPkg.Prisma.ShortUrl> {
    const result =
      await this.shortUrlRepository.findOriginalUrlAndUpdateClickCount(alias);
    if (!result) {
      throw new HttpException('Short URL not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async getShortUrlInformation(alias: Alias): Promise<GetShortUrlInfoDto> {
    const where = {
      alias,
    } as PrismaPkg.Prisma.ShortUrlWhereUniqueInput;
    const result = await this.shortUrlRepository.findShortUrl(where);
    if (!result) {
      throw new HttpException('Short URL not found', HttpStatus.BAD_REQUEST);
    }

    return {
      alias,
      clickCount: result.clickCount ?? 0,
      createdAt: result.createdAt,
      originalUrl: result.originalUrl,
    };
  }

  async createShortUrl(
    body: CreateShortUrlDto,
  ): Promise<CreateShortUrlResponseDto> {
    const { originalUrl, alias, expiredAt } = body;

    const finalAlias = alias || this.generateShortId();
    const where = {
      alias: finalAlias,
    } as PrismaPkg.Prisma.ShortUrlWhereUniqueInput;

    const result = await this.shortUrlRepository.findShortUrl(where);
    if (result) {
      throw new HttpException(
        'Short URL already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const shortUrl = this.buildShortUrl(finalAlias);
    const createShortUrlBody: PrismaPkg.Prisma.ShortUrlCreateInput = {
      alias: finalAlias,
      expiredAt: expiredAt ? new Date(expiredAt) : null,
      originalUrl,
      shortUrl,
    };

    await this.shortUrlRepository.createShortUrl(createShortUrlBody);

    return {
      shortUrl,
    };
  }

  async deleteShortUrl(id: string): Promise<void> {
    if (!id) {
      throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
    }

    const result = await this.shortUrlRepository.deleteShortUrl(+id);
    if (!result) {
      throw new HttpException('Something bad happened', HttpStatus.BAD_REQUEST);
    }

    return;
  }
}
