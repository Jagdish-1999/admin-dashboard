import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export interface PopOverProps {
	children: React.ReactNode;
	triggerChildren: any;
}

export const CustomPopover = ({ children, triggerChildren }: PopOverProps) => {
	return (
		<Popover>
			<PopoverTrigger>{triggerChildren}</PopoverTrigger>
			<PopoverContent
				side="left"
				className="backdrop-blur-lg bg-slate-900 p-3 w-fit border border-neutral-700">
				{children}
			</PopoverContent>
		</Popover>
	);
};
