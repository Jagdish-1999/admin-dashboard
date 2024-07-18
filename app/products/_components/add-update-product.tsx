"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MdAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Input from "./Input";
import TextArea from "./text-area";
import { RxUpdate } from "react-icons/rx";
import { ImSpinner8 } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  ProductImagesTypes,
  ProductInputDataProps,
  ProductTypes,
} from "@/types";
import { CreateUpdateProductTypes } from "@/types/products.slice.types";
import { createUpdateProduct } from "@/slices/products.slice";
import { CustomDialog } from "@/app/_components/common/dialog/custom-dialog";
import { CiEdit } from "react-icons/ci";
import { CustomSelect } from "@/app/_components/common/select/custom-select";
import { fetchCategories } from "@/slices/category.slice";
import { PropertiesTypes } from "@/types/category.slice.types";
import Loading from "@/app/loading";

interface AddUpdateProductProps {
  product?: ProductTypes;
  onCellLabelClick?(): void;
}

export interface ProductPropertiesTypes {
  name: string;
  value: string;
}

const initialProductInputData: ProductInputDataProps = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};

const AddUpdateProduct = ({
  product,
  onCellLabelClick,
}: AddUpdateProductProps) => {
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const [productImages, setProductImages] = useState<ProductImagesTypes[]>(
    product ? product.images : []
  );
  const [productInputData, setProductInputData] =
    useState<ProductInputDataProps>(
      product
        ? {
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
          }
        : initialProductInputData
    );
  const [category, setCategory] = useState(
    product ? product.category?._id : ""
  );
  const [selectProperties, setSelectProperties] = useState<
    ProductPropertiesTypes[]
  >(product ? product.properties : []);

  const isLoading = useAppSelector((state) => state.products.isLoading);
  const { data: categories, isLoading: isCategoriesLoading } = useAppSelector(
    (state) => state.categories
  );

  const createUpdateProductFun = useCallback(() => {
    const payload: CreateUpdateProductTypes = {
      name: productInputData.name,
      description: productInputData.description,
      quantity: productInputData.quantity,
      price: productInputData.price,
      images: productImages,
      properties: selectProperties,
      category,
    };

    dispatch(createUpdateProduct({ payload, _id: product?._id }));
    // setProductImages([]);
    // setProductInputData(initialProductInputData);
  }, [
    productInputData.name,
    productInputData.description,
    productInputData.quantity,
    productInputData.price,
    productImages,
    selectProperties,
    category,
    dispatch,
    product?._id,
  ]);

  const handleInputChange = useCallback(
    async (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (evt.target.name === "images") {
        const files = (evt.target as HTMLInputElement).files;
        if (!files?.length) return;
        const images = Array.from(files).map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }));
        setProductImages((prevImages) => [...prevImages, ...images]);
      } else {
        // handle other input fields excepting file upload
        setProductInputData((prevInputData: ProductInputDataProps) => ({
          ...prevInputData,
          [evt.target.name]: evt.target.value,
        }));
      }
    },
    []
  );

  // useEffect(() => {
  //   if (initialRef.current && !categories.length) {
  //     console.log(initialRef, categories.length);
  //     dispatch(fetchCategories());
  //     initialRef.current = false;
  //   }
  // }, [categories.length, dispatch]);

  const isErrorVisible = useMemo(() => {
    if (
      !productInputData.name ||
      !productInputData.description ||
      !productInputData.quantity ||
      !productInputData.price ||
      !category ||
      !productImages.length
    ) {
      return true;
    }
  }, [
    productInputData.name,
    productInputData.description,
    productInputData.quantity,
    productInputData.price,
    category,
    productImages.length,
  ]);

  const categoryInfo = useMemo(() => {
    let properties: PropertiesTypes[] = [];
    if (category && categories.length > 0) {
      const selectedCategory = categories.find((cat) => cat._id === category);
      properties =
        selectedCategory?.properties?.map((eachProperty) => ({
          name: eachProperty.name,
          values: eachProperty.values,
        })) || ([] as PropertiesTypes[]);
      if (
        selectedCategory?.parent &&
        selectedCategory.parent.properties?.length
      ) {
        properties = [...properties, ...selectedCategory.parent.properties];
      }
    }
    return properties;
  }, [categories, category]);

  useEffect(() => {
    const existingProperties = product?.properties;
    const notInProduct = categoryInfo.map((cat) => ({
      name: cat.name,
      value: "",
    }));

    if (existingProperties?.length === notInProduct.length) {
      setSelectProperties(existingProperties);
    } else {
      let arr: ProductPropertiesTypes[] = [];
      const result = notInProduct.reduce((acc, curr) => {
        const addTo = existingProperties?.find(
          (each) => each.name === curr.name
        );
        if (addTo) {
          acc = [...acc, addTo] as ProductPropertiesTypes[];
        } else {
          acc = [...acc, curr] as ProductPropertiesTypes[];
        }
        return acc;
      }, arr);
      setSelectProperties(result);
    }
  }, [categoryInfo, product]);

  return (
    <>
      <CustomDialog
        title={product ? "Update product" : "Create new product"}
        titleClasses="text-center text-neutral-600"
        triggerChildren={
          product ? (
            <Button className="w-full h-full">
              <CiEdit
                strokeWidth={1}
                onClick={() => {
                  onCellLabelClick?.();
                  if (!categories.length) dispatch(fetchCategories());
                }}
                className={cn(
                  "min-w-8 min-h-8 w-8 h-8 hover:bg-green-500/20 text-green-700 transition-all duration-150 ease-linear p-2 rounded-full font-semibold opacity-100"
                )}
              />
            </Button>
          ) : (
            <Button className="flex items-center justify-center gap-1 text-sm border border-teal-600 font-semibold rounded-sm h-full w-fit py-1.5 px-1.5 hover:bg-teal-100/40 bg-teal-100/20 text-teal-700 transition-all duration-150 font-afacad">
              <MdAdd className="w-5 h-5" />
              Add product
            </Button>
          )
        }
      >
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            if (isErrorVisible) return;
            createUpdateProductFun();
          }}
          className={cn(
            "custom-scrollbar font-dm-sans flex flex-col gap-3.5 rounded-sm p-2 bg-inherit w-full  max-h-[75vh] min-w-[50vw] max-w-[50vw] overflow-y-auto custom-scrollbar"
          )}
          style={{ height: "100%" }}
        >
          <div className="flex gap-4">
            <Input
              required
              type="text"
              id="product-name"
              label="Product name"
              name="name"
              placeholder="Product name"
              onChange={handleInputChange}
              value={productInputData.name}
            />
            <CustomSelect
              name="category"
              required
              className="h-full"
              options={categories}
              value={category}
              label="Category"
              onChange={(val: string) => {
                setCategory(val === "null" ? "" : val);
              }}
            />
          </div>
          {categoryInfo.length > 0 && !isCategoriesLoading ? (
            <div className="flex flex-col gap-4">
              {categoryInfo.map((property) => (
                <div className="flex gap-4" key={property.name}>
                  <Input
                    disabled
                    id={property.name}
                    name={property.name}
                    className="uppercase"
                    placeholder={property.name}
                    value={property.name}
                  />
                  <CustomSelect
                    name={property.name}
                    required
                    className="h-full"
                    options={property.values?.map((eachProperty) => ({
                      _id: eachProperty,
                      name: eachProperty,
                    }))}
                    value={
                      selectProperties.find((val) => val.name === property.name)
                        ?.value || ""
                    }
                    placeholder={`Select ${property.name}`}
                    onChange={(val: string) => {
                      setSelectProperties((prevProperty) =>
                        prevProperty.map((eachProperty) =>
                          eachProperty.name === property.name
                            ? {
                                ...eachProperty,
                                value: val === "null" ? "" : val,
                              }
                            : eachProperty
                        )
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
          <div className="flex gap-4">
            <Input
              required
              id="price"
              type="number"
              label="Price"
              name="price"
              placeholder="Price"
              onChange={handleInputChange}
              value={productInputData.price || ""}
            />
            <Input
              required
              id="quantity"
              type="number"
              label="Quantity"
              name="quantity"
              placeholder="Quantity"
              onChange={handleInputChange}
              value={productInputData.quantity || ""}
            />
          </div>
          <div className="h-fit">
            <TextArea
              required
              id="description"
              label="Description"
              name="description"
              placeholder="Product description..."
              onChange={handleInputChange}
              value={productInputData.description}
            />
          </div>
          <Input
            required
            id="file"
            type="file"
            name="images"
            label="Upload image"
            placeholder="Upload image"
            onChange={handleInputChange}
            productImages={productImages}
            setProductImages={setProductImages}
            error={!productImages.length}
            value={""}
          />
          {isErrorVisible && (
            <h6
              className={cn(
                "text-[10px] indent-0.5 mt-2 text-red-500 opacity-100 transition-all duration-150",
                !isErrorVisible && "opacity-0"
              )}
            >
              All fields marked with{" "}
              <span className="text-red-600 text-[14px]">*</span> are required!
            </h6>
          )}
          <Button
            disabled={isErrorVisible}
            className={cn(
              "select-none border flex justify-center items-center gap-1.5 font-semibold text-neutral-900/80 hover:border-neutral-500/25 hover:text-neutral-900/90 border-neutral-500/15  transition-all duration-150 text-sm w-44 mt-2 rounded-sm bg-neutral-500/15 hover:bg-neutral-500/25 disabled:border-neutral-500/10 disabled:text-neutral-600/70",
              isLoading && "bg-green-400/30"
            )}
            type="submit"
          >
            {!product ? (
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
      </CustomDialog>
    </>
  );
};

export { AddUpdateProduct };
