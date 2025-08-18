import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { urlListTableColumns } from "@/entities/url/lib/columns/url-list-table-columns.tsx";
import { useDeleteShortUrl } from "@/entities/url/lib/hooks/useDeleteShortUrl.ts";
import { useGetShortUrlList } from "@/entities/url/lib/hooks/useGetShortUrlList.ts";
import type { GetShortUrlDto } from "@/entities/url/model";
import { ROUTE_PATHS } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Icons } from "@/shared/ui/Icons";
import { Table } from "@/shared/ui/Table";

export const UrlList = () => {
	const navigate = useNavigate();
	const [idToDelete, setIdToDelete] = useState<number | null>(null);

	const { data, isLoading } = useGetShortUrlList();
	const { mutateAsync: deleteShortUrl } = useDeleteShortUrl();

	const goToCreateUrlForm = async () => {
		await navigate({
			to: ROUTE_PATHS.createUrl,
		});
	};

	const handleDeleteShortUrl = async (item: GetShortUrlDto) => {
		try {
			const { id } = item;
			setIdToDelete(id);
			await deleteShortUrl(id);
		} catch (error) {
			console.error("handleDeleteShortUrl", error);
		} finally {
			setIdToDelete(null);
		}
	};

	const columns = urlListTableColumns({
		deleteShortUrl: handleDeleteShortUrl,
		idToDelete,
	});

	if (isLoading) {
		return <Icons.loader></Icons.loader>;
	}

	return (
		<div className="flex flex-col gap-4 p-4">
			<Button className="w-fit" onClick={() => goToCreateUrlForm()}>
				Create
			</Button>
			<Card>
				<CardHeader>
					<CardTitle></CardTitle>
				</CardHeader>
				<CardContent>
					<Table<GetShortUrlDto> columns={columns} data={data ?? []} />
				</CardContent>
			</Card>
		</div>
	);
};
