import { cn } from "@/lib/utils";
import { RenderCellProps, TableHeadProps } from "@/types/table.types";
import { TableCell } from "./table-cell";
import { TableRow } from "./table-row";

const TableHead = <T,>({ columns, className }: TableHeadProps<T>) => {
  return (
    <thead className={cn(className)}>
      <TableRow className={cn("bg-inherit text-inherit")}>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            colId={column.id}
            className={cn(
              "w-full h-full flex text-inherit py-2",
              column.className,
              column.headClasses
            )}
          >
            {column.headCellLabel({} as RenderCellProps<T>)}
          </TableCell>
        ))}
      </TableRow>
    </thead>
  );
};

export { TableHead };
