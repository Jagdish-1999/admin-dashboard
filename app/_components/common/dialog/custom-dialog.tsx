import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PopOverProps } from "../popover/custom-popover";
import { cn } from "@/lib/utils";

interface CustomDialogProps extends PopOverProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
  footerContent?: ReactNode;
  open?: boolean;
  onOpenChange?(val: boolean): void;
  titleClasses?: string;
  descriptionClasses?: string;
  className?: string;
}

export function CustomDialog({
  triggerChildren,
  title,
  children,
  description,
  footerContent,
  open,
  onOpenChange,
  titleClasses,
  descriptionClasses,
  className,
}: CustomDialogProps) {
  return (
    <Dialog onOpenChange={(oopen) => onOpenChange?.(oopen)} open={open}>
      <DialogTrigger className="w-full h-full" asChild>
        {triggerChildren}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "min-w-[28rem] w-fit h-fit max-h-[85vh] max-w-[75vw] bg-neutral-50 gap-1",
          className
        )}
      >
        <DialogHeader hidden>
          <DialogTitle className={cn(titleClasses)}>{title}</DialogTitle>
          <DialogDescription className={cn(descriptionClasses)}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
