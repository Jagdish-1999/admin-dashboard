import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

export interface PopOverProps {
  children: React.ReactNode;
  triggerChildren: ReactNode;
  align?: "start" | "center" | "end";
  side?: "left" | "right" | "top" | "bottom";
}

export const CustomPopover = ({
  children,
  triggerChildren,
  align,
  side,
}: PopOverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{triggerChildren}</PopoverTrigger>
      <PopoverContent
        alignOffset={8}
        align={align || "end"}
        side={side || "bottom"}
        className=" w-fit h-fit backdrop-blur-md bg-slate-200 p-0 border rounded-sm border-neutral-500/20"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
