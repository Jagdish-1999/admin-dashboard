import { cn } from "@/lib/utils";

interface TextAreaProps {
  id: string;
  value: string;
  label: string;
  name: string;
  required?: boolean;
  placeholder: string;
  error?: boolean;
  onChange(evt: React.ChangeEvent<HTMLTextAreaElement>): void;
}

const TextArea = ({
  id,
  error,
  label,
  value,
  name,
  required,
  onChange,
  placeholder,
}: TextAreaProps) => {
  return (
    <div className="flex flex-col w-full justify-start gap-0.5 min-h-[80px] rounded-sm">
      <label
        htmlFor={id}
        className={cn(
          "select-none mb-0.5 text-neutral-400 text-xs",
          value && "text-neutral-200"
        )}
      >
        {label}
        {required && <span className={cn(error && "text-red-500")}> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "custom-scrollbar w-full h-full bg-transparent outline-none border rounded-sm transition-all duration-200 ease-linear focus-visible:border-neutral-300 border-neutral-500 placeholder:text-[12px] placeholder:text-neutral-500 p-3 min-h-[120px] max-h-[330px] overflow-y-auto text-sm text-neutral-200",
          value && "border-neutral-300"
        )}
      />
    </div>
  );
};

export default TextArea;
