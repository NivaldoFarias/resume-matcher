import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

/**
 * Generic data table component that handles sorting and pagination
 *
 * @param columns - The column definitions for the table
 * @param data - The data to display in the table
 * @returns A fully functional data table with sorting and pagination
 */
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : (
												flexRender(header.column.columnDef.header, header.getContext())
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ?
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						:	<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						}
					</TableBody>
				</Table>
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={() => table.previousPage()}
							className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
					{Array.from({ length: table.getPageCount() }, (_, i) => (
						<PaginationItem key={i}>
							<PaginationLink
								href="#"
								onClick={() => table.setPageIndex(i)}
								isActive={table.getState().pagination.pageIndex === i}
							>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={() => table.nextPage()}
							className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
