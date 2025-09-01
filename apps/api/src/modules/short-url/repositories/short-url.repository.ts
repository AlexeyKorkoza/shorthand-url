import { Injectable } from '@nestjs/common';
import * as PrismaPkg from '@prisma/client';

import { PrismaService } from '@/services/prisma.service';
import { GetShortUrlDto } from '@/modules/short-url/dtos';

@Injectable()
export class ShortUrlRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllShortUrls(): Promise<GetShortUrlDto[]> {
    return this.prismaService.client.shortUrl.findMany({
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOriginalUrlAndUpdateClickCount(alias: Alias): Promise<PrismaPkg.Prisma.ShortUrl> {
    return this.prismaService.client.$transaction(async (tx) => {
      const result = await tx.shortUrl.findUnique({
        where: {
          alias,
        } as PrismaPkg.Prisma.ShortUrlWhereUniqueInput,
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
        where: { alias } as PrismaPkg.Prisma.ShortUrlWhereUniqueInput,
      });

      return result;
    });
  }

  findShortUrl(
    where: PrismaPkg.Prisma.ShortUrlWhereUniqueInput,
  ): Promise<PrismaPkg.Prisma.ShortUrl | null> {
    return this.prismaService.client.shortUrl.findUnique({
      where,
    });
  }

  createShortUrl(data: PrismaPkg.Prisma.ShortUrlCreateInput): Promise<PrismaPkg.Prisma.ShortUrl> {
    return this.prismaService.client.shortUrl.create({
      data,
    });
  }

  deleteShortUrl(id: number): Promise<PrismaPkg.Prisma.ShortUrl> {
    return this.prismaService.client.shortUrl.delete({
      where: {
        id,
      } as PrismaPkg.Prisma.ShortUrlWhereUniqueInput,
    });
  }
}
