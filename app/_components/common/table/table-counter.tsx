import { TableCounterProps } from "@/types/table.types";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";

const TableCounter = ({ totalCount, currentCount }: TableCounterProps) => {
  return (
    <TableRow
      className="w-fit p-2 px-8 rounded-full bg-transparent border border-neutral-500/10 backdrop-blur-md transition-all duration-300 z-50 opacity-100 hover:opacity-0"
      style={{
        position: "absolute",
        left: "50%",
        bottom: "18px",
        transform: "translateX(-50%)",
      }}
    >
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
