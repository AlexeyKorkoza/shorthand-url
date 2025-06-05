export class CreateShortUrlDto {
  alias?: string;
  expiredAt?: Date;
  originalUrl: string;
}
