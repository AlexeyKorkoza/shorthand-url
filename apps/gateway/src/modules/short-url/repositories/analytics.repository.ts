import { type ShortUrlAnalytic } from "@db/prisma-client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/services/prisma.service";

@Injectable()
export class AnalyticsRepository {
  constructor(private prismaService: PrismaService) {}

  findLastIpAddressesByCount(
    shortUrlId: number,
    count: number,
  ): Promise<ShortUrlAnalytic[]> {
    return this.prismaService.shortUrlAnalytic.findMany({
      take: count,
      where: {
        shortUrlId,
      },
    });
  }

  saveIpAddress({
    shortUrlId,
    ipAddress,
  }: {
    shortUrlId: number;
    ipAddress: string;
  }): Promise<ShortUrlAnalytic> {
    return this.prismaService.shortUrlAnalytic.create({
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
