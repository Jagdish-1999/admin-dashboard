"use client";
import React, { ReactNode } from "react";

import SuppressHydration from "@/lib/suppresh-hydration";
import { TableHead } from "./table-head";
import { TableSkeleton } from "./table-skeleton";
import { TableProps } from "@/types/table.types";
import { TableRow } from "./table-row";
import { TableCounter } from "./table-counter";
import { NoDataAvalable } from "./table-no-data";
import { TableBody } from "./table-body";
import { TableCell } from "./table-cell";
import { cn } from "@/lib/utils";

const Table = <T extends { id: string }>({
  columns,
  data,
  isLoading,
  onCellLabelClick,
}: TableProps<T>) => {
  return (
    <SuppressHydration>
      <div className="overflow-hidden h-full w-full rounded-sm rounded-ee-[3px] border border-neutral-500/20  bg-slate-300">
        <table className="relative w-full h-full">
          <TableHead
            columns={columns}
            className="bg-neutral-500/25 text-[18px]"
          />
          <TableBody
            className="custom-scrollbar block w-full h-full overflow-y-auto font-dm-sans text-xs"
            style={{ height: "100%" }}
          >
            {isLoading && data.length === 0 && (
              <TableSkeleton columns={columns} />
            )}
            {data.length > 0 &&
              !isLoading &&
              data.map((item: T, idx) => {
                return (
                  <TableRow
                    key={item.id}
                    className={cn(idx % 2 !== 0 && "bg-neutral-500/20 ")}
                  >
                    {columns.map((column) => (
                      <TableCell<T>
                        key={column.id}
                        colId={column.id}
                        className={cn(column.className)}
                      >
                        {column.bodyCellLabel({
                          item,
                          onCellLabelClick,
                        })}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            {!data.length && !isLoading && <NoDataAvalable />}
          </TableBody>
          <TableCounter totalCount={data.length} currentCount={data.length} />
        </table>
      </div>
    </SuppressHydration>
  );
};

export { Table };
