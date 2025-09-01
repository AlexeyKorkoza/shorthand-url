import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class AnalyticsRepository {
  constructor(private prismaService: PrismaService) {}

  findLastIpAddressesByCount(
    shortUrlId: number,
    count: number,
  ): Promise<Prisma.ShortUrlAnalytic[]> {
    return this.prismaService.client.shortUrlAnalytic.findMany({
      take: count,
      where: {
        shortUrlId,
      } as Prisma.ShortUrlAnalyticWhereInput,
    });
  }

  saveIpAddress({
    shortUrlId,
    ipAddress,
  }: {
    shortUrlId: number;
    ipAddress: string;
  }): Promise<Prisma.ShortUrlAnalytic> {
    return this.prismaService.client.shortUrlAnalytic.create({
      data: {
        ipAddress,
        shortUrl: {
          connect: {
            id: shortUrlId,
          },
        },
      },
    });
  }
}
