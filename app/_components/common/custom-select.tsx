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
}
const CustomSelect = <T extends { id: string; name: string }>({
  options,
  onChange,
  value,
}: CustomSelectProps<T>) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className={cn(
          "w-auto font-dm-sans p-3 rounded-sm text-xs",
          !value && "text-neutral-500/80"
        )}
      >
        <SelectValue placeholder="Selece parent category" className="p-1" />
      </SelectTrigger>
      <SelectContent
        className="font-dm-sans absolute backdrop-blur-md"
        style={{ background: "#77777799", color: "#fff", maxHeight: "300px" }}
      >
        <div className="h-full w-full text-white">
          <SelectItem value="default" defaultChecked>
            Select parent category
          </SelectItem>
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
  );
};

export { CustomSelect };
