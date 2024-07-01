"use client";
import React, { useCallback } from "react";
import { cn } from "@/lib/utils";

import { TableHead } from "./table-head";
import { TableBody } from "./table-body";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";
import { TableSkeleton } from "./table-skeleton";
import { TableCounter } from "./table-counter";
import { NoDataAvalable } from "./table-no-data";
import { TableItem, TableProps } from "@/types/table.types";

const Table = <T extends TableItem>({
  data,
  columns,
  isLoading,
  warnRows,
  onCellLabelClick,
}: TableProps<T>) => {
  const showWarnRows = useCallback(
    (itemId: string) => {
      if (warnRows?.includes(itemId)) {
        return true;
      }
      return false;
    },
    [warnRows]
  );

  return (
    <div className="overflow-hidden h-full w-full rounded-sm rounded-ee-[3px] border border-neutral-500/20  bg-slate-300">
      <table className="table relative w-full h-full">
        <TableHead
          columns={columns}
          className="bg-neutral-500/15 text-[18px]"
          onCellLabelClick={onCellLabelClick}
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
                  className={cn(
                    idx % 2 !== 0 &&
                      "bg-neutral-500/10 transition-all duration-150",
                    showWarnRows(item.id) && "bg-inherit",
                    item.isDeleting && "pointer-events-none select-none"
                  )}
                >
                  {columns.map((column) => (
                    <TableCell<T>
                      key={column.id}
                      className={cn(
                        column.className,
                        showWarnRows(item.id) && " text-red-500 opacity-85"
                      )}
                    >
                      {column.bodyCellLabel({ item, onCellLabelClick })}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          {!data.length && !isLoading && <NoDataAvalable />}
        </TableBody>
        {data.length > 0 && !isLoading && (
          <TableCounter totalCount={data.length} currentCount={data.length} />
        )}
      </table>
    </div>
  );
};

export { Table };
