import { useNavigate } from "@tanstack/react-router";
import { urlListTableColumns } from "@/entities/url/lib/columns/url-list-table-columns.tsx";
import { useGetShortUrlList } from "@/entities/url/lib/hooks/useGetShortUrlList.ts";
import type { GetShortUrlDto } from "@/entities/url/model";
import { ROUTE_PATHS } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Icons } from "@/shared/ui/Icons";
import { Table } from "@/shared/ui/Table";

export const UrlList = () => {
	const navigate = useNavigate();
	const { data, isLoading } = useGetShortUrlList();
	const columns = urlListTableColumns();

	if (isLoading) {
		return <Icons.loader></Icons.loader>;
	}

	const goToCreateUrlForm = async () => {
		await navigate({
			to: ROUTE_PATHS.createUrl,
		});
	};

	return (
		<div>
			<Button onClick={() => goToCreateUrlForm()}>Create</Button>
			{data && <Table<GetShortUrlDto> columns={columns} data={data} />}
		</div>
	);
};
