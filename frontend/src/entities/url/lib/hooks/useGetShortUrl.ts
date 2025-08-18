import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import { getShortUrlInfo } from "@/entities/url/api/short-url-api.ts";
import { urlKeys } from "@/entities/url/lib/factories/url-keys.factory.ts";
import type { GetShortUrlDto } from "@/entities/url/model";

type Props = {
	shortUrl: UniqueShortUrl;
};

export const useGetShortUrl = ({
	shortUrl,
}: Props): UseQueryResult<GetShortUrlDto> => {
	return useQuery({
		queryKey: urlKeys.item(shortUrl),
		queryFn: () => getShortUrlInfo(shortUrl),
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
};
