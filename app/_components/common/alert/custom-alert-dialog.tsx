import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PopOverProps } from "../popover/custom-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertDialogProps extends PopOverProps {
  continueButtonText(): string | React.ReactNode;
  cancelButtonText?: string | React.ReactNode;
  dialogTitle: string | React.ReactNode;
  onCancel?(evt: React.MouseEvent<HTMLButtonElement>): void;
  onContinue(evt: React.MouseEvent<HTMLButtonElement>): void;
}

const CustomAlertDialog = ({
  triggerChildren,
  children,
  dialogTitle,
  onCancel,
  onContinue,
  cancelButtonText = "Cancel",
  continueButtonText,
}: AlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{triggerChildren}</AlertDialogTrigger>
      <AlertDialogContent className="bg-neutral-100 border border-neutral-300">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel ? onCancel : () => {}}
            className="border border-neutral-500"
          >
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onContinue}
            className={cn("p-0 m-0 w-[73px] h-full")}
          >
            {continueButtonText?.() || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
