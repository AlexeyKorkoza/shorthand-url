import { ApiProperty } from "@nestjs/swagger";

class IpAddressItemDtoClass {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: String })
  ipAddress!: string;

  @ApiProperty({ type: Number })
  shortUrlId!: number;
}

export class SwaggerGetAnalyticsResponseDto {
  @ApiProperty({ type: [IpAddressItemDtoClass] })
  ipAddresses!: Array<IpAddressItemDtoClass>;
}
