import type { CreateShortUrlDto } from "@/entities/url/model";
import { httpClient } from "@/shared/api";

export const createShortUrl = (body: CreateShortUrlDto): Promise<string> => {
	return httpClient.post("/short-url/shorten", {
		body: JSON.stringify(body),
	});
};

export const deleteShortUrl = (shortUrl: string): Promise<void> => {
	return httpClient.delete(`/short-url/delete/${shortUrl}`);
};
