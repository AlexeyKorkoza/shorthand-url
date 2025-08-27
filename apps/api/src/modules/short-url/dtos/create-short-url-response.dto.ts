import { ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlResponseDto {
  @ApiProperty({ description: 'Generated short URL', type: String })
  shortUrl!: UniqueShortUrl;
}
