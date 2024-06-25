"use client";
import React from "react";
import { Cell } from "./colums";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ProductListItemTypes } from "@/types/product-list-slice.types";

interface DataTableProps {
	columns: {
		id: string;
		headerIcon?: React.ReactNode | undefined;
		icon?: React.ReactNode | undefined;
		classes: string;
		headerClasses: string;
		header: string;
		accessorKey: string;
	}[];
	data: ProductListItemTypes[];
	isLoading: boolean;
}

const DataTable = ({ columns, data, isLoading }: DataTableProps) => {
	return (
		<div className="w-full h-full">
			<table className="table relative w-full h-full overflow-hidden cursor-pointer ">
				<thead className="w-full flex bg-slate-900/60 cursor-default select-none backdrop-blur-sm">
					<tr className="border-b border-neutral-500 w-full flex">
						{columns.map((column, idx) => {
							return (
								<Cell
									key={column.id + idx}
									label={column.header}
									headerIcon={column.headerIcon}
									headerClasses={column.headerClasses}
								/>
							);
						})}
					</tr>
				</thead>
				<tbody className="w-full h-[calc(100%-38px)] overflow-y-auto bg-slate-900/60 block scroll-smooth custom-scrollbar">
					{!data.length && isLoading && (
						<tr className="bg-slate-900 w-full gap-1 flex flex-col mt-1">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, idx) => (
								<td
									key={i}
									className={cn(
										"flex gap-1 pl-1 w-full h-full animate-pulse",
										idx % 2 !== 0 && "bg-slate-950/35 animation-delay-1000"
									)}>
									{columns.map((col) => (
										<Skeleton
											key={col.id}
											className={cn(
												"w-full h-[50px] p-4 rounded-sm flex items-center justify-center bg-slate-800 gap-1",
												col.headerClasses,
												idx % 2 === 0 && "animate-pulse animation-delay-75"
											)}>
											<Skeleton
												className={cn(
													"w-full h-[20px] rounded-sm bg-slate-950/40",
													idx % 2 === 0 && " animate-pulse animation-delay-1000"
												)}
											/>
										</Skeleton>
									))}
								</td>
							))}
						</tr>
					)}
					{data.map((item, idx) => {
						return (
							<tr
								className={cn(
									"border-b border-slate-800 w-full flex hover:bg-slate-800/50 transition-all duration-150 h-fit",
									idx % 2 !== 0 && "bg-slate-950/35"
								)}
								key={item._id}>
								{columns.map((column) => {
									return (
										<Cell
											showDate={
												column.accessorKey === "createdAt" ||
												column.accessorKey === "updatedAt"
											}
											onClick={() => {
												const {
													productName,
													description,
													price,
													_id,
													images,
													qty,
												} = item;
												localStorage.setItem(
													"edited-product",
													JSON.stringify({
														productName,
														description,
														images,
														price,
														qty,
														id: _id,
													})
												);
											}}
											icon={column.icon}
											classes={column.classes}
											key={column.id + Date.now()}
											label={`${
												item[
													column.accessorKey as keyof Omit<
														ProductListItemTypes,
														"images"
													>
												]
											}`}
										/>
									);
								})}
							</tr>
						);
					})}
					{!data.length && !isLoading && (
						<tr className="w-full flex">
							<td rowSpan={1} className="w-full">
								<h4 className="w-full text-center p-2">No data available</h4>
							</td>
						</tr>
					)}
					{/* Total count container */}
					<tr className="absolute flex items-center justify-center bg-neutral-500/10 backdrop-blur-md w-28 h-fit left-1/2 bottom-4 -translate-x-1/2 py-3 rounded-full text-xs">
						<td className="">
							<span className="text-[12px] font-bold text-neutral-400">
								{data.length}
							</span>
							<span className="px-1">/</span>
							<span className="font-extrabold text-neutral-400 text-[14px]">
								{data.length}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
