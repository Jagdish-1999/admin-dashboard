"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AddEditProduct } from "../_components/add-edit-product";
import { useAppDispatch } from "@/stores/store";
import { createUpdateProduct } from "@/slices/products.slice";

import {
  DESCRIPTION,
  PRICE,
  PRODUCT_IMAGES,
  PRODUCT_NAME,
  ProductImagesTypes,
  ProductInputDataProps,
  QUANTITY,
} from "@/types";
import { CreateUpdateProductTypes } from "@/types/products.slice.types";

const initialProductInputData: ProductInputDataProps = {
  [PRODUCT_NAME]: {
    value: "",
    error: true,
  },
  [DESCRIPTION]: {
    value: "",
    error: true,
  },
  [PRICE]: {
    value: null,
    error: true,
  },
  [QUANTITY]: {
    value: null,
    error: false,
  },
};

const CreateNewProduct = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [productImages, setProductImages] = useState<ProductImagesTypes[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(
    params.pageTitle[0] === "edit"
  );
  const [productInputData, setProductInputData] =
    useState<ProductInputDataProps>(initialProductInputData);

  const isCreating = params.pageTitle[0] === "new";

  const handleInputChange = useCallback(
    async (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (evt.target.name === PRODUCT_IMAGES) {
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
          [evt.target.name]: {
            ...prevInputData[evt.target.name as keyof ProductInputDataProps],
            error: !evt.target.value,
            value: evt.target.value,
          },
        }));
      }
    },
    []
  );

  const createUpdateProductFun = useCallback(async () => {
    // TODO need to validate this code - working or not
    const payload: CreateUpdateProductTypes = {
      [PRODUCT_NAME]: productInputData[PRODUCT_NAME].value,
      [DESCRIPTION]: productInputData[DESCRIPTION].value,
      [QUANTITY]: productInputData[QUANTITY].value,
      [PRICE]: productInputData[PRICE].value,
      images: productImages,
    };
    const item = JSON.parse(localStorage.getItem("edited-product") || "{}");

    const response = await dispatch(
      createUpdateProduct({ payload, id: item.id })
    );
    if (response.meta.requestStatus === "fulfilled") {
      setProductImages([]);
      setProductInputData(initialProductInputData);
      router.push("/products");
    }
  }, [productInputData, productImages, dispatch, router]);

  useEffect(() => {
    if (isCreating) localStorage.removeItem("edited-product");
    const item = JSON.parse(localStorage.getItem("edited-product") || "{}");
    setProductInputData((prevData: ProductInputDataProps) => ({
      ...prevData,
      [PRODUCT_NAME]: {
        value: item?.[PRODUCT_NAME] || "",
        error: !item?.[PRODUCT_NAME],
      },
      [DESCRIPTION]: {
        value: item?.[DESCRIPTION] || "",
        error: !item?.[DESCRIPTION],
      },
      [PRICE]: {
        value: item?.[PRICE] || 0,
        error: !item?.[PRICE],
      },
      [QUANTITY]: {
        value: item?.[QUANTITY] || 0,
        error: !item?.[QUANTITY],
      },
    }));
    setProductImages(
      item?.images?.map(({ url, id }: { url: string; id: string }) => ({
        url,
        id,
      })) || []
    );
    setIsProductLoading(false);
  }, [setIsProductLoading, setProductInputData, isCreating]);
  if (
    !isCreating &&
    !localStorage.getItem("edited-product") &&
    !isProductLoading
  ) {
    setIsProductLoading(true);
    setTimeout(() => {
      setIsProductLoading(false);
      router.push("/products");
    }, 0);
  }

  if (isProductLoading)
    return <h4 className="p-4 flex items-center justify-center">Loading...</h4>;

  return (
    <div className="flex items-center justify-center w-full h-full rounded-sm">
      <AddEditProduct
        isCreating={isCreating}
        onChange={handleInputChange}
        productData={productInputData}
        productImages={productImages}
        onSubmit={createUpdateProductFun}
        setProductImages={setProductImages}
      />
    </div>
  );
};

export default CreateNewProduct;
