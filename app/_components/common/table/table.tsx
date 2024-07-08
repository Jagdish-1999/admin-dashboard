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
  noDataText,
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
    <div className="overflow-hidden h-full w-full rounded-sm rounded-ee-[3px] border border-neutral-500/20">
      <table
        className="table overflow-auto relative w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
        <TableHead
          columns={columns}
          className="bg-neutral-500/10 text-[18px] absolute backdrop-blur-md w-full h-fit z-10"
          onCellLabelClick={onCellLabelClick}
        />
        <TableBody
          className="custom-scrollbar block w-full h-full overflow-auto font-dm-sans text-xs top-10"
          style={{ height: "100%" }}
        >
          <TableRow className="p-4">
            <TableCell>
              <p></p>
            </TableCell>
          </TableRow>
          {isLoading && !data.length && <TableSkeleton columns={columns} />}
          {data.length > 0 &&
            data.map((item: T, idx) => {
              return (
                <TableRow
                  key={item._id}
                  className={cn(
                    idx % 2 !== 0 &&
                      "bg-neutral-500/10 transition-all duration-150",
                    showWarnRows(item._id) && "bg-inherit",
                    item.isDeleting && "pointer-events-none select-none"
                  )}
                >
                  {columns.map((column) => (
                    <TableCell<T>
                      key={column.id}
                      className={cn(
                        column.className,
                        showWarnRows(item._id) && " text-red-500"
                      )}
                    >
                      {column.bodyCellLabel({ item, onCellLabelClick })}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          {!data.length && !isLoading && (
            <NoDataAvalable noDataText={noDataText} />
          )}
          {data.length > 0 && !isLoading && (
            <TableCounter totalCount={data.length} currentCount={data.length} />
          )}
        </TableBody>
      </table>
    </div>
  );
};

export { Table };
