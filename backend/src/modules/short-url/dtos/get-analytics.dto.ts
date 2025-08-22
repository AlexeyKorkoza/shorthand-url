import { ApiProperty } from '@nestjs/swagger';

class IpAddressItemDto {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: String })
  ipAddress!: string;

  @ApiProperty({ type: Number })
  shortUrlId!: number;
}

export class GetAnalyticsDto {
  @ApiProperty({ type: [IpAddressItemDto] })
  ipAddresses!: Array<IpAddressItemDto>;
}
