import { IsDate, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShortUrlDto {
  @ApiPropertyOptional()
  @IsString()
  alias?: string;

  @ApiPropertyOptional()
  @IsDate()
  expiredAt?: Date;

  @ApiProperty()
  @IsUrl()
  originalUrl: string;
}
