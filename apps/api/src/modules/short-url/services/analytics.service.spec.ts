import { Test, TestingModule } from '@nestjs/testing';

import { AnalyticsService } from './analytics.service';
import { AnalyticsRepository } from '../repositories/analytics.repository';
import { ShortUrlRepository } from '../repositories/short-url.repository';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  const analyticsRepository = {
    findLastIpAddressesByCount: jest.fn(),
    saveIpAddress: jest.fn(),
  };
  const shortUrlRepository = {
    findShortUrl: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: AnalyticsRepository, useValue: analyticsRepository },
        { provide: ShortUrlRepository, useValue: shortUrlRepository },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getShortUrlAnalytics', () => {
    it('returns last ip addresses for a short url', async () => {
      shortUrlRepository.findShortUrl.mockResolvedValueOnce({ id: 10 });
      analyticsRepository.findLastIpAddressesByCount.mockResolvedValueOnce([
        { id: 1, ipAddress: '1.1.1.1', shortUrlId: 10 },
        { id: 2, ipAddress: '2.2.2.2', shortUrlId: 10 },
      ]);

      const result = await service.getShortUrlAnalytics('alias1');

      expect(shortUrlRepository.findShortUrl).toHaveBeenCalledWith({
        alias: 'alias1',
      });
      expect(
        analyticsRepository.findLastIpAddressesByCount,
      ).toHaveBeenCalledWith(10, 5);
      expect(result).toEqual({
        ipAddresses: [
          { id: 1, ipAddress: '1.1.1.1', shortUrlId: 10 },
          { id: 2, ipAddress: '2.2.2.2', shortUrlId: 10 },
        ],
      });
    });

    it('throws when short url is not found', async () => {
      shortUrlRepository.findShortUrl.mockResolvedValueOnce(null);

      await expect(service.getShortUrlAnalytics('missing')).rejects.toThrow(
        'Short URL not found',
      );
    });

    it('throws when ip addresses cannot be found', async () => {
      shortUrlRepository.findShortUrl.mockResolvedValueOnce({ id: 10 });
      analyticsRepository.findLastIpAddressesByCount.mockResolvedValueOnce(
        null,
      );

      await expect(service.getShortUrlAnalytics('alias1')).rejects.toThrow(
        'Could not find last addresses',
      );
    });
  });

  describe('saveIpAddress', () => {
    it('delegates to repository', async () => {
      analyticsRepository.saveIpAddress.mockResolvedValueOnce({ id: 1 });

      const payload = { shortUrlId: 1, ipAddress: '8.8.8.8' };
      const result = await service.saveIpAddress(payload);

      expect(analyticsRepository.saveIpAddress).toHaveBeenCalledWith(payload);
      expect(result).toEqual({ id: 1 });
    });
  });
});
