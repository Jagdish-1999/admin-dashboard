import { cn } from "@/lib/utils";
import { OnCellClickProps, TableCellProps } from "@/types/table.types";

const TableCell = <T,>({ children, className }: TableCellProps<T>) => {
  return (
    <td
      className={cn(
        "cursor-pointer w-full h-full text-sm text-inherit transition-all duration-150",
        className
      )}
    >
      {children}
    </td>
  );
};

export { TableCell };
