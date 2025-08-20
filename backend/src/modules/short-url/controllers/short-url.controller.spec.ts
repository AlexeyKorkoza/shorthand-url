import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';
import { AnalyticsService } from '@/modules/short-url/services/analytics.service';

jest.mock('nanoid', () => ({ nanoid: () => 'mockedid1' }));

describe('ShortUrlController', () => {
  let controller: ShortUrlController;

  const shortUrlService = {
    getAllShortUrls: jest.fn(),
    createShortUrl: jest.fn(),
    getShortUrlInformation: jest.fn(),
    deleteShortUrl: jest.fn(),
  };
  const analyticsService = {
    getShortUrlAnalytics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlController],
      providers: [
        { provide: ShortUrlService, useValue: shortUrlService },
        { provide: AnalyticsService, useValue: analyticsService },
      ],
    }).compile();

    controller = module.get<ShortUrlController>(ShortUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
