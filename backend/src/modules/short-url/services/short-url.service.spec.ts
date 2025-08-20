import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ShortUrlService } from './short-url.service';
import { ShortUrlRepository } from '../repositories/short-url.repository';

jest.mock('nanoid', () => ({ nanoid: () => 'mockedid1' }));

describe('ShortUrlService', () => {
  let service: ShortUrlService;
  const shortUrlRepository = {
    findAllShortUrls: jest.fn(),
    findOriginalUrlAndUpdateClickCount: jest.fn(),
    findShortUrl: jest.fn(),
    createShortUrl: jest.fn(),
    deleteShortUrl: jest.fn(),
  };
  const configGetMock = jest.fn();
  const configService = {
    get: configGetMock,
  } as unknown as ConfigService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUrlService,
        { provide: ShortUrlRepository, useValue: shortUrlRepository },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<ShortUrlService>(ShortUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllShortUrls', () => {
    it('returns all short urls', async () => {
      const data = [{ id: 1 }, { id: 2 }];
      shortUrlRepository.findAllShortUrls.mockResolvedValueOnce(data);

      const result = await service.getAllShortUrls();

      expect(shortUrlRepository.findAllShortUrls).toHaveBeenCalledTimes(1);
      expect(result).toBe(data);
    });
  });

  describe('findOriginalUrlAndUpdateClickCount', () => {
    it('returns short url when found', async () => {
      const item = { id: 1, originalUrl: 'https://example.com' };
      shortUrlRepository.findOriginalUrlAndUpdateClickCount.mockResolvedValueOnce(
        item,
      );

      const result = await service.findOriginalUrlAndUpdateClickCount('abc');

      expect(
        shortUrlRepository.findOriginalUrlAndUpdateClickCount,
      ).toHaveBeenCalledWith('abc');
      expect(result).toBe(item);
    });

    it('throws 404 when not found', async () => {
      shortUrlRepository.findOriginalUrlAndUpdateClickCount.mockResolvedValueOnce(
        null,
      );

      await expect(
        service.findOriginalUrlAndUpdateClickCount('missing'),
      ).rejects.toBeInstanceOf(HttpException);

      try {
        await service.findOriginalUrlAndUpdateClickCount('missing');
      } catch (e) {
        const err = e as HttpException;
        expect(err.getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(err.message).toBe('Short URL not found');
      }
    });
  });

  describe('getShortUrlInformation', () => {
    it('returns info dto when found', async () => {
      const createdAt = new Date('2020-01-01T00:00:00.000Z');
      shortUrlRepository.findShortUrl.mockResolvedValueOnce({
        createdAt,
        originalUrl: 'https://example.com',
        clickCount: undefined,
      });

      const result = await service.getShortUrlInformation('alias1');

      expect(shortUrlRepository.findShortUrl).toHaveBeenCalledWith({
        alias: 'alias1',
      });
      expect(result).toEqual({
        alias: 'alias1',
        clickCount: 0,
        createdAt,
        originalUrl: 'https://example.com',
      });
    });

    it('throws 400 when not found', async () => {
      shortUrlRepository.findShortUrl.mockResolvedValueOnce(null);

      await expect(
        service.getShortUrlInformation('missing'),
      ).rejects.toBeInstanceOf(HttpException);

      try {
        await service.getShortUrlInformation('missing');
      } catch (e) {
        const err = e as HttpException;
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.message).toBe('Short URL not found');
      }
    });
  });

  describe('createShortUrl', () => {
    it('creates with provided alias when not existing', async () => {
      configGetMock.mockReturnValueOnce('https://sho.rt');
      shortUrlRepository.findShortUrl.mockResolvedValueOnce(null);
      shortUrlRepository.createShortUrl.mockResolvedValueOnce({ id: 1 });

      const result = await service.createShortUrl({
        originalUrl: 'https://example.com',
        alias: 'custom',
      });

      expect(shortUrlRepository.findShortUrl).toHaveBeenCalledWith({
        alias: 'custom',
      });
      expect(shortUrlRepository.createShortUrl).toHaveBeenCalledWith(
        expect.objectContaining({
          alias: 'custom',
          originalUrl: 'https://example.com',
          shortUrl: 'https://sho.rt/custom',
          expiredAt: null,
        }),
      );
      expect(result).toEqual({ shortUrl: 'https://sho.rt/custom' });
    });

    it('creates with generated alias when none provided', async () => {
      configGetMock.mockReturnValueOnce('https://sho.rt');
      shortUrlRepository.findShortUrl.mockResolvedValueOnce(null);
      shortUrlRepository.createShortUrl.mockResolvedValueOnce({ id: 1 });

      const result = await service.createShortUrl({
        originalUrl: 'https://example.com',
      });

      expect(shortUrlRepository.findShortUrl).toHaveBeenCalledWith({
        alias: 'mockedid1',
      });
      expect(shortUrlRepository.createShortUrl).toHaveBeenCalledWith(
        expect.objectContaining({
          alias: 'mockedid1',
          shortUrl: 'https://sho.rt/mockedid1',
        }),
      );
      expect(result).toEqual({ shortUrl: 'https://sho.rt/mockedid1' });
    });

    it('converts expiredAt to Date when provided', async () => {
      configGetMock.mockReturnValueOnce('https://sho.rt');
      shortUrlRepository.findShortUrl.mockResolvedValueOnce(null);
      shortUrlRepository.createShortUrl.mockResolvedValueOnce({ id: 1 });

      const result = await service.createShortUrl({
        originalUrl: 'https://example.com',
        expiredAt: new Date('2021-05-05T00:00:00.000Z'),
      });

      expect(shortUrlRepository.createShortUrl).toHaveBeenCalledWith(
        expect.objectContaining({ expiredAt: expect.any(Date) }),
      );
      expect(result).toEqual({ shortUrl: 'https://sho.rt/mockedid1' });
    });

    it('throws 400 when alias already exists', async () => {
      configGetMock.mockReturnValueOnce('https://sho.rt');
      shortUrlRepository.findShortUrl.mockResolvedValueOnce({ id: 1 });

      await expect(
        service.createShortUrl({
          originalUrl: 'https://example.com',
          alias: 'a',
        }),
      ).rejects.toBeInstanceOf(HttpException);

      try {
        await service.createShortUrl({
          originalUrl: 'https://example.com',
          alias: 'a',
        });
      } catch (e) {
        const err = e as HttpException;
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.message).toBe('Short URL already exists');
      }
    });
  });

  describe('deleteShortUrl', () => {
    it('throws 400 when id is missing', async () => {
      await expect(service.deleteShortUrl('')).rejects.toBeInstanceOf(
        HttpException,
      );

      try {
        await service.deleteShortUrl('');
      } catch (e) {
        const err = e as HttpException;
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.message).toBe('ID is required');
      }
    });

    it('deletes existing short url', async () => {
      shortUrlRepository.deleteShortUrl.mockResolvedValueOnce({ id: 1 });

      await expect(service.deleteShortUrl('5')).resolves.toBeUndefined();
      expect(shortUrlRepository.deleteShortUrl).toHaveBeenCalledWith(5);
    });

    it('throws 400 when delete fails', async () => {
      shortUrlRepository.deleteShortUrl.mockResolvedValueOnce(null);

      await expect(service.deleteShortUrl('5')).rejects.toBeInstanceOf(
        HttpException,
      );

      try {
        await service.deleteShortUrl('5');
      } catch (e) {
        const err = e as HttpException;
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.message).toBe('Something bad happened');
      }
    });
  });
});
