import { Cell, EachColumnType } from "./colums";

export interface TableHeaderType<T, C> {
  columns: EachColumnType<C>[];
  onCellClick?(item: T, column: EachColumnType<C>, selected: boolean): void;
  item: T;
}

const TableHeader = <T, C>({
  columns,
  onCellClick,
  item,
}: TableHeaderType<T, C>) => {
  return (
    <thead className="w-full flex bg-neutral-800/10 cursor-default select-none backdrop-blur-sm h-9 ">
      <tr className="border-b border-neutral-500/50 w-full flex font-afacad">
        {columns.map((column, idx) => {
          return (
            <Cell
              isHeader={column.id === "checkbox" ? !data.length : true}
              id={column.id}
              hideIcon={column.id === "edit" || column.id === "delete"}
              onCheckedChange={(check) =>
                onCellClick && onCellClick(item, column, true)
              }
              key={column.id + idx}
              label={column.header}
              headerIcon={column.headerIcon}
              headerClasses={column.headerClasses}
            />
          );
        })}
      </tr>
    </thead>
  );
};

export { TableHeader };
