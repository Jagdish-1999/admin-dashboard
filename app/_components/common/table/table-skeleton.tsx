import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TableCell } from "./table-cell";
import { TableSkeletonProps } from "@/types/table.types";
import { TableRow } from "./table-row";

const TableSkeleton = <T,>({ columns }: TableSkeletonProps<T>) => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, idx) => (
        <TableRow
          key={idx}
          className={cn("", idx % 2 !== 0 && "bg-neutral-100/50")}
        >
          {columns.map((column) => (
            <TableCell
              key={column.id + idx + i}
              className={cn(
                "flex items-center justify-center gap-1",
                column.className
              )}
            >
              <Skeleton
                className={cn(
                  "w-full h-[50px] px-2 py-4 rounded-none bg-neutral-500/35",
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
