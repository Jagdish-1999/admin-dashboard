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
const CustomSelect = <T extends { id: string; name: string }>({
  options,
  onChange,
  value,
  className,
  label,
  required = true,
  placeholder = "Select category",
}: CustomSelectProps<T>) => {
  return (
    <span className="flex flex-col w-full">
      <label
        className={cn(
          "select-none text-neutral-900/50 transition-all duration-150 text-xs mb-0.5",
          value && "text-neutral-900/90"
        )}
      >
        {label || "Category"}
        {required && <span className={cn(!value && "text-red-500")}> *</span>}
      </label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={cn(
            "w-auto font-dm-sans p-3 rounded-sm text-xs",
            className,
            !value && "text-neutral-500/80"
          )}
        >
          <SelectValue placeholder={placeholder} className="p-1" />
        </SelectTrigger>
        <SelectContent
          className={cn("font-dm-sans absolute backdrop-blur-md")}
          style={{ background: "#77777799", color: "#fff", maxHeight: "300px" }}
        >
          <div className="h-full w-full text-white">
            {options.map((eachOption) => (
              <SelectItem
                value={eachOption.id}
                key={eachOption.id}
                className={cn(
                  "cursor-pointer hover:text-black capitalize font-semibold",
                  value === eachOption.id && "text-white"
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
