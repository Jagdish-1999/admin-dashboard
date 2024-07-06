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

interface CustomDialogProps extends PopOverProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
  footerContent?: ReactNode;
  open?: boolean;
  onOpenChange?(val: boolean): void;
}

export function CustomDialog({
  triggerChildren,
  title,
  children,
  description,
  footerContent,
  open,
  onOpenChange,
}: CustomDialogProps) {
  return (
    <Dialog onOpenChange={(oopen) => onOpenChange?.(oopen)} open={open}>
      <DialogTrigger>{triggerChildren}</DialogTrigger>
      <DialogContent className="min-w-[28rem] w-fit h-fit max-h-[85vh] max-w-[75vw] bg-neutral-50">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
