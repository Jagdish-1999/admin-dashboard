import { ContextType } from "@/lib/column-cell-label-wrapper";
import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface ColumnContext<T> {
  item: T;
  column: TableColumnTypes<T>;
}

export interface TableCounterProps {
  totalCount: number;
  currentCount: number;
}

export interface OnChildrenClickContextType<T> {
  id: string;
  accessKey: string;
  item: T;
}

export interface RenderCellProps<T> {
  item: T;
  isChecked?: boolean;
  onCellLabelClick?(context: OnChildrenClickContextType<T>): void;
  onCheckedChange?(check: boolean): void;
}

export interface TableColumnTypes<T> {
  id: string;
  accessKey: keyof T;
  className?: string;
  headClasses?: string;
  bodyCellLabel(item: RenderCellProps<T>): ReactNode;
  headCellLabel(item: RenderCellProps<T>): ReactNode;
}

export interface TableSkeletonProps<T> {
  columns: TableColumnTypes<T>[];
}

//? --------------------------------------- TABLE PROPS ---------------------------------------------

export interface OnCellClickProps<T> {
  item: T;
  colId: string;
}

export interface TableCellProps<T>
  extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode | ReactElement | string;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface TableHeadProps<T>
  extends HTMLAttributes<HTMLTableSectionElement> {
  columns: TableColumnTypes<T>[];
  onCellLabelClick?(context: ContextType<T>): void;
}

export interface TableProps<T> {
  data: T[];
  isLoading: boolean;
  columns: TableColumnTypes<T>[];
  warnRows?: string[];
  onCellLabelClick?(context: ContextType<T>): void;
}

export interface TableItem {
  _id: string;
  isDeleting: boolean;
}
