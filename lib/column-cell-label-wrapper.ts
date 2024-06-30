import { RenderCellProps } from "@/types/table.types";
import { ReactNode } from "react";

export interface ContextType<T> {
  item: T;
  id: string;
  accessKey: string;
  onCellLabelClick(context: T): void;
}

const tableLabelTextWrapper = function <
  I extends { id: string; accessKey: string },
  T,
>(this: I, bodyCellLabel: (context: ContextType<T>) => ReactNode) {
  const ctx = this;
  return function (param: RenderCellProps<T>) {
    const { item, onCellLabelClick, ...rest } = param;

    const createdContext: ContextType<T> = {
      id: ctx.id,
      accessKey: ctx.accessKey,
      item,
      onCellLabelClick: () => onCellLabelClick?.(createdContext),
    };

    return bodyCellLabel.call(ctx, createdContext);
  };
};

export { tableLabelTextWrapper };
