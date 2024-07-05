import { cn } from "@/lib/utils";
import { TableBodyProps } from "@/types/table.types";

const TableBody = ({ children, className, style }: TableBodyProps) => {
  return (
    <tbody className={cn(className)} style={style}>
      {children}
    </tbody>
  );
};

export { TableBody };
