import { ShortUrlAnalytic } from '@prisma/client';
import type { PrismaService } from '@/services/prisma.service';
import { AnalyticsRepository } from './analytics.repository';

interface PrismaShortUrlAnalyticDelegate {
  findMany: jest.Mock<Promise<ShortUrlAnalytic[]>, [unknown]>;
  create: jest.Mock<Promise<ShortUrlAnalytic>, [unknown]>;
}

interface PrismaClientMock {
  shortUrlAnalytic: PrismaShortUrlAnalyticDelegate;
}

describe('AnalyticsRepository', () => {
  const prisma: PrismaClientMock = {
    shortUrlAnalytic: {
      findMany: jest.fn<Promise<ShortUrlAnalytic[]>, [unknown]>(),
      create: jest.fn<Promise<ShortUrlAnalytic>, [unknown]>(),
    },
  };

  let repository: AnalyticsRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new AnalyticsRepository(prisma as unknown as PrismaService);
  });

  it('findLastIpAddressesByCount delegates to prisma.findMany', async () => {
    const list: ShortUrlAnalytic[] = [
      {
        id: 1,
        ipAddress: '1.1.1.1',
        shortUrlId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        ipAddress: '2.2.2.2',
        shortUrlId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    prisma.shortUrlAnalytic.findMany.mockResolvedValueOnce(list);

    const result = await repository.findLastIpAddressesByCount(10, 5);

    expect(prisma.shortUrlAnalytic.findMany).toHaveBeenCalledWith({
      take: 5,
      where: { shortUrlId: 10 },
    });
    expect(result).toBe(list);
  });

  it('saveIpAddress delegates to prisma.create', async () => {
    const created: ShortUrlAnalytic = {
      id: 1,
      ipAddress: '8.8.8.8',
      shortUrlId: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.shortUrlAnalytic.create.mockResolvedValueOnce(created);

    const result = await repository.saveIpAddress({
      shortUrlId: 10,
      ipAddress: '8.8.8.8',
    });

    expect(prisma.shortUrlAnalytic.create).toHaveBeenCalledWith({
      data: {
        ipAddress: '8.8.8.8',
        shortUrl: {
          connect: { id: 10 },
        },
      },
    });
    expect(result).toBe(created);
  });
});
