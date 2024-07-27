import { NoDataProps } from "@/types/table.types";
import { TableCell } from "./table-cell";
import { TableRow } from "./table-row";

const NoDataAvalable = ({ noDataText = "No data vailable" }: NoDataProps) => {
  return (
    <TableRow>
      <TableCell>
        <h4 className="text-center p-2">{noDataText}</h4>
      </TableCell>
    </TableRow>
  );
};

export { NoDataAvalable };
