import { TableCounterProps } from "@/types/table.types";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";
import { TableBody } from "./table-body";

const TableCounter = ({ totalCount, currentCount }: TableCounterProps) => {
  return (
    <TableBody className="absolute left-1/2 -translate-x-1/2 h-fit bg-transparent group font-afacad bg-red-500">
      <TableRow className="absolute w-fit p-2 px-8 opacity-100 rounded-full border border-neutral-500/10 backdrop-blur-md left-1/2 -translate-x-1/2 bottom-4 hover:opacity-0 transition-all duration-300">
        <TableCell colId="total-current-count">
          <span className="text-[12px] font-bold text-slate-900/80">
            {currentCount}
          </span>
          <span className="px-1">/</span>
          <span className="font-extrabold text-slate-900/90 text-[14px]">
            {totalCount}
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export { TableCounter };
