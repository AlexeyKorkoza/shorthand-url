import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlRedirectController } from './short-url-redirect.controller';

describe('ShortUrlRedirectController', () => {
  let controller: ShortUrlRedirectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlRedirectController],
    }).compile();

    controller = module.get<ShortUrlRedirectController>(
      ShortUrlRedirectController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
