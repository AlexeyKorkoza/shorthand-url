import { ApiProperty } from "@nestjs/swagger";

export class SwaggerGetShortUrlInfoResponseDto {
  @ApiProperty({ type: String })
  alias!: Alias;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Number })
  clickCount!: number;

  @ApiProperty({ type: String })
  originalUrl!: UniqueShortUrl;
}
