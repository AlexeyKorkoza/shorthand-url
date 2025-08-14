import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import type { GetShortUrlDto } from "@/entities/url/model";
import { ROUTE_PATHS } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";

const columnHelper = createColumnHelper<GetShortUrlDto>();

export const urlListTableColumns = () => [
	columnHelper.accessor("alias", {
		header: "Alias",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("clickCount", {
		header: "Click Count",
		cell: (info) => info.getValue(),
	}),
	columnHelper.display({
		id: "View",
		cell: (info) => {
			const { row } = info;
			const { id } = row.original;

			return (
				<div>
					<Button asChild>
						<Link to={ROUTE_PATHS.viewUrl} params={{ urlId: id }}>
							View
						</Link>
					</Button>
				</div>
			);
		},
	}),
];
