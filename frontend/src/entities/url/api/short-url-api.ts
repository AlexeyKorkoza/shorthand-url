import type { CreateShortUrlDto, GetShortUrlDto } from "@/entities/url/model";
import { httpClient } from "@/shared/api";

const BASE_SHORT_API_URL = "short-url";

export const createShortUrl = (body: CreateShortUrlDto): Promise<string> => {
	return httpClient.post(`${BASE_SHORT_API_URL}/shorten`, {
		body: JSON.stringify(body),
	});
};

export const deleteShortUrl = (shortUrl: string): Promise<void> => {
	return httpClient.delete(`${BASE_SHORT_API_URL}/delete/${shortUrl}`);
};

export const getShortUrlList = (): Promise<GetShortUrlDto[]> => {
	return httpClient.get(`${BASE_SHORT_API_URL}/list`);
};
