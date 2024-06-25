"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AddEditProduct } from "../_components/add-edit-product";
import { useAppDispatch } from "@/stores/store";
import { createUpdateProductAction } from "@/slices/product-list-slice";
import { ApiResponseTypes } from "@/types/api-response.types";

import {
  DESCRIPTION,
  PRICE,
  PRODUCT_IMAGES,
  PRODUCT_NAME,
  ProductImagesTypes,
  ProductInputDataProps,
  QUANTITY,
} from "@/types";

export const initialProductInputData: ProductInputDataProps = {
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
    const formData = new FormData();
    const existingImages: string[] = [];
    productImages.forEach((files) => {
      if (files.file) formData.append("images", files.file);
      else if (files.id) existingImages.push(files.id);
    });
    const payload = {
      [PRODUCT_NAME]: productInputData[PRODUCT_NAME].value,
      [DESCRIPTION]: productInputData[DESCRIPTION].value,
      [QUANTITY]: productInputData[QUANTITY].value,
      [PRICE]: productInputData[PRICE].value,
    };
    formData.append("payload", JSON.stringify(payload));
    if (existingImages.length)
      formData.append("images", JSON.stringify(existingImages));

    const item = JSON.parse(localStorage.getItem("edited-product") || "{}");

    const response = await dispatch(
      createUpdateProductAction({ formData, id: item.id })
    );
    if (response.meta.requestStatus === "fulfilled") {
      setProductImages([]);
      setProductInputData(initialProductInputData);
      router.push("/products");
    }
  }, [productInputData, productImages, dispatch, router]);

  // const updateProduct = useCallback(async () => {
  // 	//TODO need to fix this local storage things
  // 	const item = JSON.parse(localStorage.getItem("edited-product") || "{}");
  // 	const formData = new FormData();
  // 	productImages.forEach((files) => {
  // 		if (files.file) formData.append("images", files.file);
  // 	});
  // 	formData.append(`${PRODUCT_NAME}`, productInputData[PRODUCT_NAME].value);
  // 	formData.append(`${DESCRIPTION}`, productInputData[DESCRIPTION].value);
  // 	formData.append(`${QUANTITY}`, `${productInputData[QUANTITY].value}`);
  // 	formData.append(`${PRICE}`, `${productInputData[PRICE].value}`);

  // 	const response = await dispatch(updateProducts({ formData, id: item._id }));
  // 	const payload = response.payload as ApiResponseTypes<null>;
  // 	if (payload.success) {
  // 		console.log(payload);
  // 		setTimeout(() => {
  // 			setProductImages([]);
  // 			setProductInputData(initialProductInputData);
  // 		}, 0);
  // 		router.push("/products");
  // 	}
  // }, [dispatch, productImages, productInputData, router]);

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
