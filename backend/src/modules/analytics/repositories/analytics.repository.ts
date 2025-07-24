import { Injectable } from '@nestjs/common';
import { Prisma, ShortUrlAnalytic } from '@prisma/client';

import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class AnalyticsRepository {
  private readonly IP_ADDRESSES_COUNT = 5;

  constructor(private prismaService: PrismaService) {}

  findLastIpAddressesByCount(
    shortUrlId: number,
    count = this.IP_ADDRESSES_COUNT,
  ): Promise<ShortUrlAnalytic[]> {
    return this.prismaService.shortUrlAnalytic.findMany({
      take: count,
      where: {
        shortUrlId,
      } as Prisma.ShortUrlAnalyticWhereUniqueInput,
    });
  }
}
