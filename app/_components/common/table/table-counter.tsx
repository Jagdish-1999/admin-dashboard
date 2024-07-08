import { TableCounterProps } from "@/types/table.types";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";

const TableCounter = ({ totalCount, currentCount }: TableCounterProps) => {
  return (
    <TableRow className="w-fit p-2 px-8 absolute left-1/2 -translate-x-1/2 bottom-4 rounded-full bg-transparent border border-neutral-500/10 backdrop-blur-md transition-all duration-150 z-10 opacity-100 hover:opacity-0">
      <TableCell className="flex gap-1 cursor-default">
        <span className="text-[12px] font-bold text-slate-900/80">
          {currentCount}
        </span>
        <span>/</span>
        <span className="font-extrabold text-slate-900/90 text-[14px]">
          {totalCount}
        </span>
      </TableCell>
    </TableRow>
  );
};

export { TableCounter };
