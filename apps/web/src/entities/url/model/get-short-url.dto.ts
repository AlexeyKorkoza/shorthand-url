export interface GetShortUrlDto {
	id: number;
	originalUrl: string;
	shortUrl: string;
	alias: string;
	clickCount: number | null;
	expiredAt: Date | null;
	createdAt: Date;
}
