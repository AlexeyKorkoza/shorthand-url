import { Injectable } from '@nestjs/common';
import { Prisma, ShortUrl } from '@prisma/client';

import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class ShortUrlRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllShortUrls(): Promise<ShortUrl[]> {
    return this.prismaService.shortUrl.findMany();
  }

  async findOriginalUrlAndUpdateClickCount(
    shortUrl: UniqueShortUrl,
  ): Promise<string> {
    return await this.prismaService.$transaction(async (tx) => {
      const result = await tx.shortUrl.findUnique({
        where: {
          shortUrl,
        } as Prisma.ShortUrlWhereUniqueInput,
      });
      if (!result) {
        throw new Error('Short URL not found');
      }

      await tx.shortUrl.update({
        data: {
          clickCount: {
            increment: 1,
          },
        },
        where: { shortUrl } as Prisma.ShortUrlWhereUniqueInput,
      });

      return result.originalUrl;
    });
  }

  findShortUrl(
    where: Prisma.ShortUrlWhereUniqueInput,
  ): Promise<ShortUrl | null> {
    return this.prismaService.shortUrl.findUnique({
      where,
    });
  }

  createShortUrl(data: Prisma.ShortUrlCreateInput): Promise<ShortUrl> {
    return this.prismaService.shortUrl.create({
      data,
    });
  }

  deleteShortUrl(id: number): Promise<ShortUrl> {
    return this.prismaService.shortUrl.delete({
      where: {
        id,
      } as Prisma.ShortUrlWhereUniqueInput,
    });
  }
}
