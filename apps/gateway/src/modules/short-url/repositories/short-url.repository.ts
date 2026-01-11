import { Prisma, type ShortUrl } from "@db/prisma-client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/services/prisma.service";
import { GetShortUrlDto } from "@/modules/short-url/dtos";

@Injectable()
export class ShortUrlRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllShortUrls(): Promise<GetShortUrlDto[]> {
    return this.prismaService.shortUrl.findMany({
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOriginalUrlAndUpdateClickCount(alias: Alias): Promise<ShortUrl> {
    return this.prismaService.$transaction(async (tx) => {
      const result = await tx.shortUrl.findUnique({
        where: {
          alias,
        } as Prisma.ShortUrlWhereUniqueInput,
      });
      if (!result) {
        throw new Error("Short URL not found");
      }

      await tx.shortUrl.update({
        data: {
          clickCount: {
            increment: 1,
          },
        },
        where: { alias } as Prisma.ShortUrlWhereUniqueInput,
      });

      return result;
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
