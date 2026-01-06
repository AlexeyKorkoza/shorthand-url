import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlRedirectController } from './short-url-redirect.controller';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';
import { AnalyticsService } from '@/modules/short-url/services/analytics.service';

jest.mock('nanoid', () => ({ nanoid: () => 'mockedid1' }));

describe('ShortUrlRedirectController', () => {
  let controller: ShortUrlRedirectController;

  const shortUrlService = {
    findOriginalUrlAndUpdateClickCount: jest.fn(),
  };
  const analyticsService = {
    saveIpAddress: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlRedirectController],
      providers: [
        { provide: ShortUrlService, useValue: shortUrlService },
        { provide: AnalyticsService, useValue: analyticsService },
      ],
    }).compile();

    controller = module.get<ShortUrlRedirectController>(
      ShortUrlRedirectController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
