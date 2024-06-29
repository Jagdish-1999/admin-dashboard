"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MdAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Input from "./Input";
import TextArea from "./text-area";
import { BiArrowBack } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { ImSpinner8 } from "react-icons/im";
import { useAppSelector } from "@/stores/store";
import {
  DESCRIPTION,
  PRICE,
  PRODUCT_IMAGES,
  PRODUCT_NAME,
  ProductImagesTypes,
  ProductInputDataProps,
  QUANTITY,
} from "@/types";

interface AddEditProductProps {
  isCreating: boolean;
  onChange(
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onSubmit(evt: React.FormEvent<HTMLFormElement>): void;
  productData: ProductInputDataProps;
  productImages: ProductImagesTypes[];
  setProductImages: React.Dispatch<React.SetStateAction<ProductImagesTypes[]>>;
}

export const AddEditProduct = ({
  isCreating,
  onChange,
  onSubmit,
  productData,
  productImages,
  setProductImages,
}: AddEditProductProps) => {
  const router = useRouter();
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const isErrorVisible = useMemo(() => {
    if (
      productData[PRODUCT_NAME].error ||
      productData[DESCRIPTION].error ||
      productData[PRICE].error ||
      productData[QUANTITY].error ||
      !productData[PRODUCT_NAME].value ||
      !productData[QUANTITY].value ||
      !productData[DESCRIPTION].value ||
      !productData[PRICE].value ||
      !productImages.length
    ) {
      return true;
    }
  }, [productData, productImages.length]);

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-full w-full px-8 py-1 gap-2 rounded-sm",
        isLoading && "pointer-events-none opacity-85"
      )}
    >
      <div className="flex justify-between w-full h-fit items-center">
        <button
          onClick={() => router.back()}
          className="rounded-full border-neutral-500/20 border p-1 cursor-pointer"
        >
          <BiArrowBack className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-center">
          {isCreating ? "Add new product" : "Edit product"}
        </h2>
        <div className=""></div>
      </div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          if (isErrorVisible) return;
          onSubmit(evt);
        }}
        className="custom-scrollbar font-dm-sans flex flex-col w-full h-full gap-6 border border-neutral-500/50 rounded-sm p-8 overflow-y-auto bg-neutral-100/90 backdrop-blur-md"
      >
        <div className="flex gap-8">
          <Input
            required
            type="text"
            id="product-name"
            label="Product name"
            name={PRODUCT_NAME}
            placeholder="Product name"
            onChange={onChange}
            error={productData[PRODUCT_NAME].error}
            value={productData[PRODUCT_NAME].value}
          />
        </div>
        <div className="flex gap-8">
          <Input
            required
            id="price"
            type="number"
            label="Price"
            name={PRICE}
            placeholder="Price"
            onChange={onChange}
            error={productData[PRICE].error}
            value={productData[PRICE].value || ""}
          />
          <Input
            required
            id="qty"
            type="number"
            label="Quantity"
            name={QUANTITY}
            placeholder="Price"
            onChange={onChange}
            error={productData[QUANTITY].error}
            value={productData[QUANTITY].value || ""}
          />
        </div>
        <div className="flex flex-col">
          <TextArea
            required
            id="description"
            label="Description"
            name={DESCRIPTION}
            placeholder="Product description..."
            onChange={onChange}
            error={productData[DESCRIPTION].error}
            value={productData[DESCRIPTION].value}
          />
        </div>
        <div className="flex gap-2 items-end">
          <Input
            required
            id="file"
            type="file"
            name={PRODUCT_IMAGES}
            label="Upload image"
            placeholder="Upload image"
            onChange={onChange}
            productImages={productImages}
            setProductImages={setProductImages}
            error={!productImages.length}
            value={""}
          />
        </div>
        {isErrorVisible && (
          <h6 className={cn("text-[10px] indent-0.5 mt-2 text-red-500")}>
            All fields marked with{" "}
            <span className="text-red-600 text-[14px]">*</span> are required!
          </h6>
        )}
        <Button
          className={cn(
            "select-none border flex justify-center items-center gap-1.5 font-semibold text-neutral-900/80 hover:border-neutral-500/25 hover:text-neutral-900/90 border-neutral-500/15  transition-all duration-150 text-sm w-44 rounded-sm bg-neutral-500/15 hover:bg-neutral-500/25",
            isErrorVisible &&
              " border-neutral-500/10 text-neutral-600/70 hover:text-neutral-600 hover:border-neutral-500/10 hover:bg-neutral-500/15 cursor-not-allowed",
            isLoading && "bg-green-400/30"
          )}
          type="submit"
        >
          {isCreating ? (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full text-green-700">
                  <ImSpinner8 className="min-w-6 min-h-6 w-6 h-6 animate-spin duration-700 hover:bg-neutral-500/30 transition-all ease-in p-1 rounded-full  font-semibold text-green-700" />
                  <div className="flex pr-2">Creating...</div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full ">
                  <MdAdd
                    className={cn(
                      "min-w-7 min-h-7 w-7 h-7 p-1 font-semibold opacity-100"
                    )}
                  />
                  <div className="flex pr-2">Create</div>
                </div>
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full gap-1 text-green-700">
                  <ImSpinner8
                    strokeWidth={0.5}
                    className={
                      "min-w-6 min-h-6 w-6 h-6 hover:bg-neutral-500/30 transition-all ease-linear p-1 rounded-full animate-spin duration-1000"
                    }
                  />
                  <div className="flex pr-2">Updating...</div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full gap-1 text-inherit">
                  <RxUpdate
                    strokeWidth={0.5}
                    className={cn(
                      "min-w-6 min-h-6 w-6 h-6 p-1 font-semibold opacity-100"
                    )}
                  />
                  <div className="flex pr-2">Update</div>
                </div>
              )}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
