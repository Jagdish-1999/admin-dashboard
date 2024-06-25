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

interface AlertDialogProps extends PopOverProps {
	dialogTitle: string;
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
			<AlertDialogContent className="bg-slate-900 border border-neutral-700">
				<AlertDialogHeader>
					<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
					<AlertDialogDescription>{children}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={onCancel ? onCancel : () => {}}
						className="border border-neutral-700">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onContinue}
						className="border border-red-500 text-red-500">
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CustomAlertDialog;
