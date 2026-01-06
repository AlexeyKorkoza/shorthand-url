import { ApiProperty } from "@nestjs/swagger";

export class SwaggerCreateShortUrlResponseDto {
  @ApiProperty({ description: "Generated short URL", type: String })
  shortUrl!: UniqueShortUrl;
}
