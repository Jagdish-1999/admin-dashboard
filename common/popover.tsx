import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface PopOverProps {
  children: React.ReactNode;
  triggerChildren: any;
  side?: "left" | "right" | "top" | "bottom";
}

export const CustomPopover = ({
  children,
  triggerChildren,
  side,
}: PopOverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{triggerChildren}</PopoverTrigger>
      <PopoverContent
        side={side || "left"}
        className="bg-neutral-500/5 w-fit h-fit backdrop-blur-md p-2 border rounded-sm border-neutral-500/20"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
