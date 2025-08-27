import { useMutation } from "@tanstack/react-query";

import { createShortUrl } from "@/entities/url/api/short-url-api.ts";
import type { CreateShortUrlDto } from "@/entities/url/model";

export const useCreateShortUrl = () => {
	return useMutation({
		mutationFn: (body: CreateShortUrlDto) => createShortUrl(body),
	});
};
