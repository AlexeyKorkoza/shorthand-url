import { useMutation } from "@tanstack/react-query";

import { deleteShortUrl } from "@/entities/url/api/short-url-api.ts";

export const useDeleteShortUrl = () => {
	return useMutation({
		mutationFn: (shortUrl: string) => deleteShortUrl(shortUrl),
	});
};
