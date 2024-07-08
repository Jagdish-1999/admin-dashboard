"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AddEditProduct } from "../_components/add-update-product";
import { useAppDispatch } from "@/stores/store";

import { ProductImagesTypes, ProductInputDataProps } from "@/types";

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
  const params = useParams();
  const dispatch = useAppDispatch();
  const [productImages, setProductImages] = useState<ProductImagesTypes[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(
    params.pageTitle[0] === "edit"
  );
  const [productInputData, setProductInputData] =
    useState<ProductInputDataProps>(initialProductInputData);

  const isCreating = params.pageTitle[0] === "new";

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

  return (
    <div className="flex items-center justify-center w-full h-full rounded-sm">
      <AddEditProduct />
    </div>
  );
};

export default CreateNewProduct;
