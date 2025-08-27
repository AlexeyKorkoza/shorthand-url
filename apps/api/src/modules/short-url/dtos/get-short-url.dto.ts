import { ApiProperty } from '@nestjs/swagger';

export class GetShortUrlDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  originalUrl: string;

  @ApiProperty({ type: String })
  shortUrl: string;

  @ApiProperty({ type: String })
  alias: string;

  @ApiProperty({ type: Number })
  clickCount: number | null;

  @ApiProperty({ type: Date })
  expiredAt: Date | null;
}
