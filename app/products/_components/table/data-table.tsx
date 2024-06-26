"use client";
import React from "react";
import { Cell } from "./colums";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ProductListItemTypes } from "@/types/product-list.slice.types";
import SuppressHydration from "@/lib/suppresh-hydration";

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
    <table className="table relative w-full h-full overflow-hidden cursor-pointer bg-transparent">
      <thead className="w-full flex bg-neutral-900/10 cursor-default select-none backdrop-blur-sm">
        <tr className="border-b border-neutral-500/50 w-full flex">
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
      <tbody className="relative w-full h-[calc(100%-38px)] overflow-y-auto bg-transparent block scroll-smooth custom-scrollbar backdrop-blur-md">
        {isLoading && (
          <tr className="bg-neutral-500/10 w-full gap-1 flex flex-col mt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, idx) => (
              <td
                key={i}
                className={cn(
                  "flex gap-1 pl-1 w-full h-full",
                  idx % 2 !== 0 && "bg-neutral-500/10"
                )}
              >
                {columns.map((col, i) => (
                  <Skeleton
                    key={col.id}
                    className={cn(
                      "w-full h-[50px] p-4 rounded-sm flex items-center justify-center bg-neutral-500/20 gap-1",
                      col.headerClasses,
                      idx % 2 === 0 && ""
                    )}
                  >
                    <Skeleton
                      className={cn(
                        "w-full h-[20px] rounded-sm bg-neutral-500/40",
                        idx % 2 === 0 && "animate-pulse"
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
                "border-b border-neutral-500/15 bg-neutral-500/5 w-full flex hover:bg-slate-500/20 transition-all duration-150 h-fit",
                idx % 2 !== 0 && "bg-neutral-500/15"
              )}
              key={item._id}
            >
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

        {/* Total count container */}

        {!isLoading && data.length > 0 && (
          <tr className="fixed flex items-center justify-center bg-neutral-500/30 backdrop-blur-md min-w-36 h-fit left-1/2 bottom-4 -translate-x-1/2 px-5 py-3 rounded-full text-xs">
            <td className="">
              <span className="text-[12px] font-semibold text-slate-900/80">
                {data.length}
              </span>
              <span className="px-1">/</span>
              <span className="font-extrabold text-slate-900/90 text-[14px]">
                {data.length}
              </span>
            </td>
          </tr>
        )}

        {!data.length && !isLoading && (
          <tr className="w-full flex text-sm font-semibold">
            <td rowSpan={1} className="w-full">
              <h4 className="text-center p-2">No data available</h4>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
