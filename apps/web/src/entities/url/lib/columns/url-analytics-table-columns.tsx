import { createColumnHelper } from "@tanstack/react-table";

import type { UrlAnalyticsTableColumn } from "@/entities/url/model";

const columnHelper = createColumnHelper<UrlAnalyticsTableColumn>();

export const urlAnalyticsTableColumns = () => [
	columnHelper.accessor("ipAddress", {
		header: "Ip Address",
		cell: (info) => info.getValue(),
	}),
];
