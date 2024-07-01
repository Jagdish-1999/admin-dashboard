import { TableCounterProps } from "@/types/table.types";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";

const TableCounter = ({ totalCount, currentCount }: TableCounterProps) => {
  return (
    <TableRow
      className="w-fit p-2 px-8 opacity-100 rounded-full bg-transparent border border-neutral-500 backdrop-blur-md hover:opacity-0 transition-all duration-300 z-50"
      style={{
        position: "absolute",
        left: "50%",
        bottom: "18px",
        transform: "translateX(-50%)",
      }}
    >
      <TableCell className="flex z-50 gap-1">
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
