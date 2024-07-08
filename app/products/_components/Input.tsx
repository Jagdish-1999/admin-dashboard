"use client";
import { cn } from "@/lib/utils";
import { ProductImagesTypes } from "@/types";
import Image from "next/image";
import React, { Ref, useState, forwardRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoIosEye } from "react-icons/io";
import { LiaEyeSlash } from "react-icons/lia";

interface InputProps {
  type?: string;
  id: string;
  ref?: Ref<HTMLInputElement>;
  name?: string;
  placeholder: string;
  label?: string;
  error?: boolean;
  required?: boolean;
  value: string | number;
  onChange?(evt: React.ChangeEvent<HTMLInputElement>): void;
  productImages?: ProductImagesTypes[];
  setProductImages?: React.Dispatch<React.SetStateAction<ProductImagesTypes[]>>;
  className?: string;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type,
      label,
      error,
      value,
      name,
      required,
      onChange,
      placeholder,
      productImages,
      setProductImages,
      className,
      disabled = false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    if (type === "file") {
      return (
        <div className="w-full">
          <h4
            className={cn(
              "text-neutral-900/50 text-xs -mb-1 w-fit",
              productImages?.length && "text-slate-900/90"
            )}
          >
            {label}{" "}
            {
              <span className={cn(!productImages?.length && "text-red-500")}>
                *
              </span>
            }
          </h4>
          <div className="flex items-end gap-2 w-full">
            <div className="flex flex-col min-w-28 h-28 rounded-sm border border-neutral-400 hover:border-neutral-500 transition-all duration-150">
              <label
                htmlFor={id}
                className="flex flex-col gap-2 items-center justify-center p-2 cursor-pointer w-full h-full text-neutral-900/50 text-xs hover:text-neutral-900/70 duration-150"
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
                value={""}
                className="hidden"
                onChange={onChange}
              />
            </div>
            <div className="no-scrollbar flex items-end h-[120px] w-full max-w-full overflow-x-auto rounded-sm gap-2">
              {productImages?.map((file) => (
                <div
                  key={file.url}
                  className="group/image border border-neutral-500 min-w-28 min-h-28 max-w-28 max-h-28 rounded-sm relative"
                >
                  <div
                    className="absolute cursor-pointer -right-2 -top-2 z-[2] opacity-0 group-hover/image:opacity-100 transition-all duration-150 bg-red-500/30 backdrop-blur-sm  rounded-full"
                    onClick={() => {
                      setProductImages &&
                        setProductImages((prevUrls) =>
                          prevUrls.filter((f) => {
                            if (f.id) {
                              return f.id !== file.id;
                            } else {
                              return f.url !== file.url;
                            }
                          })
                        );
                    }}
                  >
                    <RxCross2 className="w-4 h-4 font-semibold text-red-800 p-0.5" />
                  </div>
                  <Image
                    src={file.url}
                    alt="img"
                    priority
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-sm absolute top-0 left-0 z-[1]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <span className="flex w-full justify-center gap-0.5 flex-col relative">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "select-none text-neutral-900/50 transition-all duration-150 text-xs",
              value && "text-slate-900/90"
            )}
          >
            {label}
            {required && (
              <span className={cn(!value && "text-red-500")}> *</span>
            )}
          </label>
        )}
        <input
          disabled={disabled}
          id={id}
          ref={ref}
          name={name}
          autoComplete={`${name}`}
          value={value ?? ""}
          type={showPassword ? "text" : type || "text"}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            "w-full h-full p-3 font-dm-sans bg-transparent outline-none border rounded-sm transition-all duration-150 ease-linear focus-visible:border-neutral-500 border-neutral-400 placeholder:text-[12px] placeholder:text-neutral-900/50 text-sm text-neutral-900/90 disabled:opacity-50",
            className,
            value &&
              "border-neutral-900/90 text-neutral-900/70 text-sm bg-[#e7f0fe]"
          )}
        />
        <span className="absolute right-1 top-1/2 -translate-x-1/2 opacity-75 cursor-pointer">
          {showPassword && type === "password" ? (
            <IoIosEye
              className="opacity-60"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            type === "password" && (
              <LiaEyeSlash
                className="opacity-50"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )
          )}
        </span>
      </span>
    );
  }
);

Input.displayName = "Input";

export default Input;
