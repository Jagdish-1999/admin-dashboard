import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TableCell } from "./table-cell";
import { TableSkeletonProps } from "@/types/table.types";
import { TableRow } from "./table-row";

const TableSkeleton = <T,>({ columns }: TableSkeletonProps<T>) => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
        <TableRow
          key={idx}
          className={cn(
            "flex items-center justify-center gap-1 px-1 pt-1 border-none"
          )}
        >
          {columns.map((column) => (
            <TableCell
              key={column.id + idx + _}
              className={cn(
                "flex items-center justify-center gap-1",
                column.className
              )}
            >
              <Skeleton
                className={cn(
                  "w-full h-[50px] p-4 rounded-sm bg-neutral-500/35",
                  idx % 2 === 0 && "animate-pulse"
                )}
              >
                <Skeleton
                  className={cn("w-full h-[20px] rounded-sm bg-neutral-500/25")}
                />
              </Skeleton>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export { TableSkeleton };
