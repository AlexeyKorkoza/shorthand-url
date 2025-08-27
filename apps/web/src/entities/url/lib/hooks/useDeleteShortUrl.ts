import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteShortUrl } from "@/entities/url/api/short-url-api.ts";
import { urlKeys } from "@/entities/url/lib/factories/url-keys.factory.ts";
import type { GetShortUrlDto } from "@/entities/url/model";

type ContextModel =
	| {
			itemToDelete: GetShortUrlDto | undefined;
	  }
	| undefined;

export const useDeleteShortUrl = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => deleteShortUrl(id),
		onMutate: async (id: number) => {
			await queryClient.cancelQueries({ queryKey: urlKeys.list });

			const list = queryClient.getQueryData<GetShortUrlDto[]>(urlKeys.list);
			if (!list) {
				return {
					itemToDelete: undefined,
				};
			}

			const itemToDelete = list.find((e: GetShortUrlDto) => e.id === id);
			queryClient.setQueryData(urlKeys.list, (old: GetShortUrlDto[]) =>
				old.filter((item: GetShortUrlDto) => item.id !== id),
			);

			return { itemToDelete };
		},
		onSuccess: (_, id: number) => {
			queryClient.setQueryData(urlKeys.list, (old: GetShortUrlDto[]) =>
				old.filter((item: GetShortUrlDto) => item.id !== id),
			);
		},
		onError: (_, __, context: ContextModel) => {
			if (!context) {
				return;
			}

			queryClient.setQueryData(urlKeys.list, (old: GetShortUrlDto[]) =>
				context.itemToDelete ? [...old, context.itemToDelete] : old,
			);
		},
	});
};
