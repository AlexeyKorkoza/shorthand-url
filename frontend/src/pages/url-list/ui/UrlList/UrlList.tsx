import { useGetShortUrlList } from "@/entities/url/lib/hooks/useGetShortUrlList.ts";
import type { GetShortUrlDto } from "@/entities/url/model";
import { Icons } from "@/shared/ui/Icons";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/Table";

export const UrlList = () => {
	const { data, isLoading } = useGetShortUrlList();

	if (isLoading) {
		return <Icons.loader></Icons.loader>;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>URL</TableHead>
					<TableHead>Clicks</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item: GetShortUrlDto) => (
					<TableRow key={item.id}>
						<TableCell>{item.alias}</TableCell>
						<TableCell>{item.clickCount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
