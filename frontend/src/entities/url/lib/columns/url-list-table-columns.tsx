import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import type { GetShortUrlDto } from "@/entities/url/model";
import { ROUTE_PATHS } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Icons } from "@/shared/ui/Icons";

const columnHelper = createColumnHelper<GetShortUrlDto>();

type Props = {
	deleteShortUrl: (id: GetShortUrlDto) => void;
	idToDelete: number | null;
};

export const urlListTableColumns = ({ deleteShortUrl, idToDelete }: Props) => [
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
			const isLoading = id === idToDelete;

			return (
				<div className="flex gap-2 items-center">
					<Button asChild>
						<Link to={ROUTE_PATHS.viewUrl} params={{ urlId: id }}>
							View
						</Link>
					</Button>
					<Button
						disabled={isLoading}
						onClick={() => deleteShortUrl(row.original)}
						variant="destructive"
					>
						{isLoading && <Icons.loaderButton className="animate-spin" />}
						Delete
					</Button>
				</div>
			);
		},
	}),
];
