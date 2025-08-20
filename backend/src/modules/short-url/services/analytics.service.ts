import { Injectable } from '@nestjs/common';

import { AnalyticsRepository } from '@/modules/short-url/repositories/analytics.repository';
import { ShortUrlRepository } from '@/modules/short-url/repositories/short-url.repository';
import { type GetAnalyticsDto } from '@/modules/short-url/dtos';

@Injectable()
export class AnalyticsService {
  private readonly IP_ADDRESSES_COUNT = 5;

  constructor(
    private analyticsRepository: AnalyticsRepository,
    private shortUrlRepository: ShortUrlRepository,
  ) {}

  async getShortUrlAnalytics(alias: Alias): Promise<GetAnalyticsDto> {
    const where = {
      alias,
    };
    const shortUrlResult = await this.shortUrlRepository.findShortUrl(where);
    if (!shortUrlResult) {
      throw new Error('Short URL not found');
    }

    const { id } = shortUrlResult;
    const lastIpAddressesResult =
      await this.analyticsRepository.findLastIpAddressesByCount(
        id,
        this.IP_ADDRESSES_COUNT,
      );

    if (!lastIpAddressesResult) {
      throw new Error('Could not find last addresses');
    }

    const ipAddresses = lastIpAddressesResult.map((item) => ({
      id: item.id,
      ipAddress: item.ipAddress,
      shortUrlId: item.shortUrlId,
    }));

    return {
      ipAddresses,
    };
  }

  saveIpAddress({
    shortUrlId,
    ipAddress,
  }: {
    shortUrlId: number;
    ipAddress: string;
  }) {
    return this.analyticsRepository.saveIpAddress({
      shortUrlId,
      ipAddress,
    });
  }
}
