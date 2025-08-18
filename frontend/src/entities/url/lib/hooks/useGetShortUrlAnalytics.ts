import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import { getShortUrlAnalytics } from "@/entities/url/api/short-url-api.ts";
import { urlKeys } from "@/entities/url/lib/factories/url-keys.factory.ts";
import type { GetAnalyticsDto } from "@/entities/url/model";

type Props = {
	shortUrl: UniqueShortUrl;
};

export const useGetShortUrlAnalytics = ({
	shortUrl,
}: Props): UseQueryResult<GetAnalyticsDto> => {
	return useQuery({
		queryKey: urlKeys.urlAnalytics(shortUrl),
		queryFn: () => getShortUrlAnalytics(shortUrl),
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
};
