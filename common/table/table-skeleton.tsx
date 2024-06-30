import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TableCell } from "./table-cell";
import { TableSkeletonProps } from "@/types/table.types";
import { TableRow } from "./table-row";

const TableSkeleton = <T,>({ columns }: TableSkeletonProps<T>) => {
  return (
    <TableRow>
      {new Array().fill(12).map((_, idx) =>
        columns.map((column) => (
          <TableCell colId={column.id} key={idx}>
            <Skeleton
              className={cn(
                "w-full h-[50px] p-4 rounded-sm flex items-center justify-center bg-neutral-500/15 gap-1"
              )}
            >
              <Skeleton
                className={cn(
                  "w-full h-[20px] rounded-sm bg-neutral-500/25",
                  idx % 2 === 0 && "animate-pulse"
                )}
              />
            </Skeleton>
          </TableCell>
        ))
      )}
    </TableRow>
  );
};

export { TableSkeleton };
