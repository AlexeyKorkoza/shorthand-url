import { ShortUrl } from "@prisma/client";
import type { PrismaService } from "@/core/services/prisma.service";
import { ShortUrlRepository } from "./short-url.repository";

interface PrismaShortUrlDelegate {
  findMany: jest.Mock<Promise<ShortUrl[]>, []>;
  findUnique: jest.Mock<Promise<ShortUrl | null>, [unknown]>;
  create: jest.Mock<Promise<ShortUrl>, [unknown]>;
  delete: jest.Mock<Promise<ShortUrl>, [unknown]>;
  update: jest.Mock<Promise<unknown>, [unknown]>;
}

type Tx = { shortUrl: PrismaShortUrlDelegate };
type TransactionCallback = (tx: Tx) => unknown;

interface PrismaClientMock {
  shortUrl: PrismaShortUrlDelegate;
  $transaction: jest.Mock<Promise<unknown>, [TransactionCallback]>;
}

describe("ShortUrlRepository", () => {
  const prisma: PrismaClientMock = {
    shortUrl: {
      findMany: jest.fn<Promise<ShortUrl[]>, []>(),
      findUnique: jest.fn<Promise<ShortUrl | null>, [unknown]>(),
      create: jest.fn<Promise<ShortUrl>, [unknown]>(),
      delete: jest.fn<Promise<ShortUrl>, [unknown]>(),
      update: jest.fn<Promise<unknown>, [unknown]>(),
    },
    $transaction: jest.fn<Promise<unknown>, [TransactionCallback]>(),
  };

  let repository: ShortUrlRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new ShortUrlRepository(prisma as unknown as PrismaService);
  });

  it("findAllShortUrls returns list", async () => {
    const data: ShortUrl[] = [
      {
        id: 1,
        alias: "a",
        originalUrl: "https://example.com",
        shortUrl: "https://sho.rt/a",
        clickCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiredAt: null,
      },
    ];
    prisma.shortUrl.findMany.mockResolvedValueOnce(data);

    const result = await repository.findAllShortUrls();

    expect(prisma.shortUrl.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBe(data);
  });

  describe("findOriginalUrlAndUpdateClickCount", () => {
    it("returns original when found and increments clickCount", async () => {
      const found: ShortUrl = {
        id: 1,
        alias: "a",
        originalUrl: "https://example.com",
        shortUrl: "https://sho.rt/a",
        clickCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiredAt: null,
      };
      const tx: Tx = {
        shortUrl: {
          findUnique: jest
            .fn<Promise<ShortUrl | null>, [unknown]>()
            .mockResolvedValueOnce(found),
          update: jest
            .fn<Promise<unknown>, [unknown]>()
            .mockResolvedValueOnce(undefined as unknown as ShortUrl),
          findMany: jest.fn<Promise<ShortUrl[]>, []>(),
          create: jest.fn<Promise<ShortUrl>, [unknown]>(),
          delete: jest.fn<Promise<ShortUrl>, [unknown]>(),
        },
      };
      prisma.$transaction.mockImplementation((cb: TransactionCallback) =>
        Promise.resolve(cb(tx)),
      );

      const result = await repository.findOriginalUrlAndUpdateClickCount("a");

      expect(tx.shortUrl.findUnique).toHaveBeenCalledWith({
        where: { alias: "a" },
      });
      expect(tx.shortUrl.update).toHaveBeenCalledWith({
        data: { clickCount: { increment: 1 } },
        where: { alias: "a" },
      });
      expect(result).toBe(found);
    });

    it("throws when not found", async () => {
      const tx: Tx = {
        shortUrl: {
          findUnique: jest
            .fn<Promise<ShortUrl | null>, [unknown]>()
            .mockResolvedValueOnce(null),
          update: jest.fn<Promise<unknown>, [unknown]>(),
          findMany: jest.fn<Promise<ShortUrl[]>, []>(),
          create: jest.fn<Promise<ShortUrl>, [unknown]>(),
          delete: jest.fn<Promise<ShortUrl>, [unknown]>(),
        },
      };
      prisma.$transaction.mockImplementation((cb: TransactionCallback) =>
        Promise.resolve(cb(tx)),
      );

      await expect(
        repository.findOriginalUrlAndUpdateClickCount("missing"),
      ).rejects.toThrow("Short URL not found");
      expect(tx.shortUrl.update).not.toHaveBeenCalled();
    });
  });

  it("findShortUrl delegates to prisma.findUnique", async () => {
    const item: ShortUrl = {
      id: 1,
      alias: "a",
      originalUrl: "https://example.com",
      shortUrl: "https://sho.rt/a",
      clickCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiredAt: null,
    };
    prisma.shortUrl.findUnique.mockResolvedValueOnce(item);

    const result = await repository.findShortUrl({
      alias: "a",
    } as unknown as any);

    expect(prisma.shortUrl.findUnique).toHaveBeenCalledWith({
      where: { alias: "a" },
    });
    expect(result).toBe(item);
  });

  it("createShortUrl delegates to prisma.create", async () => {
    const item: ShortUrl = {
      id: 1,
      alias: "a",
      originalUrl: "https://example.com",
      shortUrl: "https://sho.rt/a",
      clickCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiredAt: null,
    };
    prisma.shortUrl.create.mockResolvedValueOnce(item);

    const result = await repository.createShortUrl({
      alias: "a",
      originalUrl: "https://example.com",
      shortUrl: "https://sho.rt/a",
    } as unknown as any);

    expect(prisma.shortUrl.create).toHaveBeenCalledWith({
      data: {
        alias: "a",
        originalUrl: "https://example.com",
        shortUrl: "https://sho.rt/a",
      },
    });
    expect(result).toBe(item);
  });

  it("deleteShortUrl delegates to prisma.delete", async () => {
    const item: ShortUrl = {
      id: 1,
      alias: "a",
      originalUrl: "https://example.com",
      shortUrl: "https://sho.rt/a",
      clickCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiredAt: null,
    };
    prisma.shortUrl.delete.mockResolvedValueOnce(item);

    const result = await repository.deleteShortUrl(5);

    expect(prisma.shortUrl.delete).toHaveBeenCalledWith({
      where: { id: 5 },
    });
    expect(result).toBe(item);
  });
});
