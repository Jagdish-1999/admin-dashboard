import { RenderCellProps } from "@/types/table.types";
import { ReactNode } from "react";

export interface Methods {
  [key: string]: Function;
}

export interface ContextType<T> {
  item: T;
  id: string;
  accessKey: string;
  methods: Methods;
  onCellLabelClick(): void;
}

const tableLabelTextWrapper = function <
  I extends { id: string; accessKey: string },
  T,
>(this: I, bodyCellLabel: (context: ContextType<T>) => ReactNode) {
  const ctx = this;
  return function (param: RenderCellProps<T>) {
    const { item, onCellLabelClick, ...rest } = param;
    const methods = {} as Methods;

    const createdContext: ContextType<T> = {
      id: ctx.id,
      accessKey: ctx.accessKey,
      item,
      methods,
      onCellLabelClick: () => onCellLabelClick?.(createdContext),
    };

    return bodyCellLabel.call(ctx, createdContext);
  };
};

export { tableLabelTextWrapper };
