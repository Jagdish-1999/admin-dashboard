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
import { PopOverProps } from "./popover";
import { MdDeleteForever } from "react-icons/md";

interface AlertDialogProps extends PopOverProps {
  dialogTitle: React.ReactNode | string;
  onCancel?(evt: React.MouseEvent<HTMLButtonElement>): void;
  onContinue(evt: React.MouseEvent<HTMLButtonElement>): void;
}

const CustomAlertDialog = ({
  triggerChildren,
  children,
  dialogTitle,
  onCancel,
  onContinue,
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
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onContinue}
            className="border text-red-600 flex gap-2 border-red-800"
          >
            <MdDeleteForever />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
