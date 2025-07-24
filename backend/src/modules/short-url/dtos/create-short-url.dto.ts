import { IsDate, IsString, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @IsString()
  alias?: string;

  @IsDate()
  expiredAt?: Date;

  @IsUrl()
  originalUrl: string;
}
