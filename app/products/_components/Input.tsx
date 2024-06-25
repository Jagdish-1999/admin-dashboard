"use client";
import { cn } from "@/lib/utils";
import { MdOutlineFileUpload } from "react-icons/md";

interface InputProps {
  type: string;
  id: string;
  name?: string;
  placeholder: string;
  label: string;
  error?: boolean;
  required?: boolean;
  value: string | number;
  onChange(evt: React.ChangeEvent<HTMLInputElement>): void;
}

function Input({
  id,
  type,
  label,
  error,
  value,
  name,
  required,
  onChange,
  placeholder,
}: InputProps) {
  if (type === "file") {
    return (
      <div className="flex justify-center gap-0.5 flex-col border border-neutral-500 rounded-sm w-28 h-28 hover:border-neutral-400 transition-all duration-200">
        <label
          htmlFor={id}
          className="flex flex-col gap-2 items-center justify-center p-2 cursor-pointer w-full h-full text-neutral-400 text-xs hover:text-neutral-300 delay-200"
        >
          <MdOutlineFileUpload className="w-6 h-6" />
          {label}
        </label>
        <input
          id={id}
          multiple
          accept="image/*"
          type={type}
          name={name}
          className="hidden"
          onChange={onChange}
        />
      </div>
    );
  }
  return (
    <div className="flex w-full justify-center gap-0.5 flex-col">
      <label
        htmlFor={id}
        className={cn(
          "select-none text-neutral-400 transition-all duration-200 text-xs",
          value && "text-neutral-200"
        )}
      >
        {label}
        {required && <span className={cn(error && "text-red-500")}> *</span>}
      </label>
      <input
        id={id}
        name={name}
        value={value ?? ""}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className={cn(
          "w-full h-full p-3 bg-transparent outline-none border rounded-sm transition-all duration-200 ease-linear focus-visible:border-neutral-300 border-neutral-500 placeholder:text-[12px] placeholder:text-neutral-500 text-sm text-neutral-200",
          value && "border-neutral-300"
        )}
      />
    </div>
  );
}

export default Input;
