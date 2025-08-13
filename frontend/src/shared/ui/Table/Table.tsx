import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/shared/lib/classname";

type Props<T> = {
	columns: ColumnDef<T, any>[];
	data: T[];
	tableClassName?: string;
};

const Table = <T,>({ tableClassName = "", columns, data }: Props<T>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn("w-full caption-bottom text-sm", tableClassName)}
			>
				<thead data-slot="table-header" className={cn("[&_tr]:border-b")}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							data-slot="table-row"
							className={cn(
								"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
							)}
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => (
								<th
									data-slot="table-head"
									className={cn(
										"text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
									)}
									key={header.id}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody
					data-slot="table-body"
					className={cn("[&_tr:last-child]:border-0")}
				>
					{table.getRowModel().rows.map((row) => (
						<tr
							data-slot="table-row"
							className={cn(
								"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
							)}
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => (
								<td
									data-slot="table-cell"
									className={cn(
										"p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
									)}
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export { Table };
