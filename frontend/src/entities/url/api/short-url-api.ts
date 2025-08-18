import type {
	CreateShortUrlDto,
	GetAnalyticsDto,
	GetShortUrlDto,
} from "@/entities/url/model";
import { httpClient } from "@/shared/api";

const BASE_SHORT_API_URL = "";

export const createShortUrl = (body: CreateShortUrlDto): Promise<string> => {
	return httpClient.post(`${BASE_SHORT_API_URL}shorten`, {
		body: JSON.stringify(body),
	});
};

export const deleteShortUrl = (id: number): Promise<void> => {
	return httpClient.delete(`${BASE_SHORT_API_URL}delete/${id}`);
};

export const getShortUrlList = (): Promise<GetShortUrlDto[]> => {
	return httpClient.get(`${BASE_SHORT_API_URL}list`);
};

export const getShortUrlAnalytics = (
	shortUrl: UniqueShortUrl,
): Promise<GetAnalyticsDto> => {
	return httpClient.get(`${BASE_SHORT_API_URL}analytics/${shortUrl}`);
};

export const getShortUrlInfo = (
	shortUrl: UniqueShortUrl,
): Promise<GetShortUrlDto> => {
	return httpClient.get(`${BASE_SHORT_API_URL}info/${shortUrl}`);
};
