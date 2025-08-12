import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import { getShortUrlList } from "@/entities/url/api/short-url-api.ts";
import { urlKeys } from "@/entities/url/lib/factories/url-keys.factory.ts";
import type { GetShortUrlDto } from "@/entities/url/model";

export const useGetShortUrlList = (): UseQueryResult<GetShortUrlDto[]> => {
	return useQuery({
		queryKey: urlKeys.list,
		queryFn: () => getShortUrlList(),
	});
};
