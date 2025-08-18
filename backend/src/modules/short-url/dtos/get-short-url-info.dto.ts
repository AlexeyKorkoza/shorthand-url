export interface GetShortUrlInfoDto {
  alias: Alias;
  createdAt: Date;
  clickCount: number;
  originalUrl: UniqueShortUrl;
}
