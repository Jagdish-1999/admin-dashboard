import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CustomSelectProps<T> {
  options: T[];
  onChange(val: string): void;
  value: string;
  className?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}
const CustomSelect = <T extends { _id: string; name: string }>({
  options,
  onChange,
  value,
  className,
  label,
  required = true,
  placeholder = "Select category",
}: CustomSelectProps<T>) => {
  return (
    <span className="flex flex-col w-full gap-0.5">
      {label && (
        <label
          className={cn(
            "select-none text-neutral-900/50 transition-all duration-150 text-xs",
            value && "text-neutral-900/90"
          )}
        >
          {label || "Category"}
          {required && <span className={cn(!value && "text-red-500")}> *</span>}
        </label>
      )}
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={cn(
            "w-auto font-dm-sans p-3 rounded-sm text-xs text-[12px] border-neutral-900/90 bg-[#e7f0fe] text-neutral-900/70",
            className,
            !value && "text-neutral-500/80 border-neutral-400 bg-transparent"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className={cn("font-dm-sans absolute backdrop-blur-md")}
          style={{ background: "#77777799", color: "#fff", maxHeight: "300px" }}
        >
          <div className="h-full w-full text-white">
            {placeholder && (
              <SelectItem value="null" defaultChecked>
                {placeholder}
              </SelectItem>
            )}
            {options.map((eachOption) => (
              <SelectItem
                key={eachOption._id}
                value={eachOption._id}
                className={cn(
                  "cursor-pointer hover:text-black capitalize font-semibold",
                  value === eachOption._id && "text-teal-950"
                )}
              >
                {eachOption.name}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </span>
  );
};

export { CustomSelect };
