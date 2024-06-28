"use client";
import React, { useCallback } from "react";
import { Cell } from "./colums";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ProductsItemTypes } from "@/types/products.slice.types";
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
  data: ProductsItemTypes[];
  isLoading: boolean;
}

const DataTable = ({ columns, data, isLoading }: DataTableProps) => {
  const onCellClick = useCallback((item: ProductsItemTypes) => {
    const { productName, description, price, _id, images, qty } = item;
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
  }, []);
  return (
    <SuppressHydration>
      <div className="overflow-hidden h-full rounded-sm rounded-ee-[3px] border border-neutral-500/30">
        <table className="table w-full h-full overflow-hidden cursor-pointer bg-transparent">
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
          <tbody className="relative w-full h-[calc(100%-38px)] overflow-y-auto bg-transparent block scroll-smooth custom-scrollbar">
            {/* //- LOADING SKELETON */}
            {isLoading && data.length === 0 && (
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
            {/* //- PRODUCTS LIST */}
            {data.length > 0 &&
              !isLoading &&
              data.map((item, idx) => {
                return (
                  <tr
                    className={cn(
                      "border-b border-neutral-500/15 bg-neutral-500/5 w-full flex hover:bg-slate-500/20 transition-all duration-150 h-fit",
                      idx % 2 !== 0 && "bg-neutral-500/15",
                      item.isDeleting && "bg-neutral-500/20"
                    )}
                    key={item._id}
                  >
                    {columns.map((column) => {
                      return (
                        <Cell
                          id={column.id}
                          showDate={
                            column.accessorKey === "createdAt" ||
                            column.accessorKey === "updatedAt"
                          }
                          onClick={() => onCellClick(item)}
                          icon={column.icon}
                          classes={column.classes}
                          isDeleting={item.isDeleting}
                          key={column.id + Date.now()}
                          label={`${
                            item[
                              column.accessorKey as keyof Omit<
                                ProductsItemTypes,
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

            {/* //- NO DATA AVAILABLE */}
            {!data.length && !isLoading && (
              <tr className="w-full flex text-sm font-semibold">
                <td rowSpan={1} className="w-full">
                  <h4 className="text-center p-2">No data available</h4>
                </td>
              </tr>
            )}

            {/* //- TOTAL COUNT CONTAINER */}
            {!isLoading && data.length > 0 && (
              <tr className="sticky bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center z-50 backdrop-blur-[8px] bg-neutral-500/10 pointer-events-none min-w-36 w-fit h-fit px-5 py-3 rounded-full text-xs">
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
          </tbody>
        </table>
      </div>
    </SuppressHydration>
  );
};

export default DataTable;
