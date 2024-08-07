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
    <div className="flex flex-col w-full justify-start gap-0.5 h-full rounded-sm">
      <label
        htmlFor={id}
        className={cn(
          "select-none mb-0.5 text-neutral-900/50 text-xs",
          value && "text-slate-900/90"
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
          "custom-scrollbar w-full h-full bg-transparent outline-none border rounded-sm transition-all duration-150 ease-linear focus-visible:border-neutral-900/50 border-neutral-400 placeholder:text-[12px] placeholder:text-neutral-900/50 p-3 min-h-[140px] max-h-[330px] overflow-y-auto text-sm text-neutral-900/90 font-semibold",
          value && "border-neutral-900/70 text-sm bg-[#e7f0fe]"
        )}
      />
    </div>
  );
};

export default TextArea;
