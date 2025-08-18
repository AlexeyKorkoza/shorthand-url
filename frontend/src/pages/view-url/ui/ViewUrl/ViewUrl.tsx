import { Link } from "@tanstack/react-router";

import { viewUrlRoute } from "@/app/router";
import { urlAnalyticsTableColumns } from "@/entities/url/lib/columns/url-analytics-table-columns.tsx";
import { useGetShortUrl } from "@/entities/url/lib/hooks/useGetShortUrl.ts";
import { useGetShortUrlAnalytics } from "@/entities/url/lib/hooks/useGetShortUrlAnalytics.ts";
import type {
	IpAddressItemModel,
	UrlAnalyticsTableColumn,
} from "@/entities/url/model";
import { ROUTE_PATHS } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Icons } from "@/shared/ui/Icons";
import { Table } from "@/shared/ui/Table";

const DEFAULT_VALUE = "-";
const TABLE_RECORDS_COUNT = 5;

interface ViewUrlParams {
	urlId: string;
}

export const ViewUrl = () => {
	const { urlId: alias } = viewUrlRoute.useParams() as ViewUrlParams;

	const { data: shortUrlData, isLoading: isShortUrlLoading } = useGetShortUrl({
		shortUrl: alias,
	});
	const { data: shortUrlAnalyticsData, isLoading: isShortUrlAnalyticsLoading } =
		useGetShortUrlAnalytics({
			shortUrl: alias,
		});
	const columns = urlAnalyticsTableColumns();

	if (isShortUrlLoading || isShortUrlAnalyticsLoading) {
		return <Icons.loader></Icons.loader>;
	}

	const ipAddresses = shortUrlAnalyticsData?.ipAddresses
		? shortUrlAnalyticsData.ipAddresses.map((item: IpAddressItemModel) => ({
				ipAddress: item.ipAddress,
			}))
		: [];

	return (
		<div className="flex flex-col gap-4 p-4">
			<Button asChild className="w-fit">
				<Link to={ROUTE_PATHS.urls}>Back</Link>
			</Button>
			<div className="grid grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Short URL Info</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-2">
							<div className="flex gap-2">
								<span>Original URL:</span>
								<span>{shortUrlData?.originalUrl ?? DEFAULT_VALUE}</span>
							</div>
							<div className="flex gap-2">
								<span>Alias:</span>
								<span>{shortUrlData?.alias ?? DEFAULT_VALUE}</span>
							</div>
						</div>
						<div className="flex gap-2 items-center">
							<span>Click count:</span>
							<span>{shortUrlAnalyticsData?.clickCount ?? 0}</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Last {TABLE_RECORDS_COUNT} Ip Addresses</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-2">
							<Table<UrlAnalyticsTableColumn>
								columns={columns}
								data={ipAddresses}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
