export interface CreateShortUrlDto {
	alias?: string;
	expiredAt?: Date | null;
	originalUrl: string;
}
