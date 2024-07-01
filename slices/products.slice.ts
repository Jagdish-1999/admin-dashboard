import axios, { AxiosResponse } from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/stores/store";
import { formatDate } from "@/lib/format-date";
import { ApiResponseTypes } from "@/types/api-response.types";
import { toast } from "sonner";
import {
  CreateUpdateProductTypes,
  ProductsItemTypes,
  ProductsTypes,
} from "@/types/products.slice.types";
import { formHeaders } from "@/lib/form.header";
import { DESCRIPTION, PRICE, PRODUCT_NAME, QUANTITY } from "@/types";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (): Promise<any> => {
    //TODO need to handle errors
    const { data } = await axios.get("/api/v1/products");

    const modifiedProducts = data.data.map((product: ProductsItemTypes) => {
      const createdAt = formatDate(product.createdAt);
      const updatedAt = formatDate(product.updatedAt);
      return {
        ...product,
        createdAt,
        updatedAt,
        isDeleting: false,
        id: product._id,
      };
    });
    return modifiedProducts;
  }
);

export const createUpdateProduct = createAsyncThunk(
  "createUpdateProduct",
  async (
    {
      payload,
      id,
    }: {
      payload: CreateUpdateProductTypes;
      id: string;
    },
    { getState }
  ): Promise<any> => {
    //TODO need to handle errors
    const formData = new FormData();
    const existingImages: string[] = [];

    payload.images.forEach((files) => {
      if (files.file) formData.append("images", files.file);
      else if (files.id) existingImages.push(files.id);
    });
    const body = {
      [PRODUCT_NAME]: payload[PRODUCT_NAME],
      [DESCRIPTION]: payload[DESCRIPTION],
      [QUANTITY]: payload[QUANTITY],
      [PRICE]: payload[PRICE],
    };

    if (existingImages.length)
      formData.append("images", JSON.stringify(existingImages));

    formData.append("payload", JSON.stringify(body));

    let data = {} as ApiResponseTypes<ProductsItemTypes>;
    if (id) {
      ({ data } = await axios.put(`/api/v1/products/${id}`, formData, {
        headers: formHeaders,
      }));
    } else {
      ({ data } = await axios.post("/api/v1/products/create", formData, {
        headers: formHeaders,
      }));
    }

    const productResult: ProductsItemTypes | null = data.data;

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    const list = (getState() as RootState).products.data.filter(
      (p) => p._id !== id
    );

    const createdAt = formatDate(productResult.createdAt);
    const updatedAt = formatDate(productResult.updatedAt);
    return [
      {
        ...productResult,
        isDeleting: false,
        createdAt,
        updatedAt,
        id: productResult._id,
      },
      ...list,
    ];
  }
);

export const deleteProductWithIds = createAsyncThunk(
  "deleteProductWithIds",
  async (productsIds: string[], { dispatch, getState }): Promise<any> => {
    const productList = (getState() as RootState).products.data;
    try {
      dispatch(
        updateProducts(
          productList.map((product: ProductsItemTypes) =>
            productsIds.includes(product._id)
              ? {
                  ...product,
                  isDeleting: true,
                }
              : product
          )
        )
      );
      const response = await axios.delete(`/api/v1/products/delete`, {
        data: productsIds,
      });
      if (response.data.success) {
        dispatch(
          updateProducts(
            productList.filter(
              (product: ProductsItemTypes) => !productsIds.includes(product._id)
            )
          )
        );
        toast.success(response.data.message);
      } else {
        dispatch(
          updateProducts(
            productList.map((product: ProductsItemTypes) =>
              productsIds.includes(product._id)
                ? {
                    ...product,
                    isDeleting: false,
                  }
                : product
            )
          )
        );
      }
      return response.data;
    } catch (error) {
      dispatch(
        updateProducts(
          productList.map((product: ProductsItemTypes) =>
            productsIds.includes(product._id)
              ? {
                  ...product,
                  isDeleting: false,
                }
              : product
          )
        )
      );
      console.error("[Error]: ", error);
      toast.error("Product not deleted some error occur");
    }
  }
);

const initialState: ProductsTypes = {
  data: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts(state, action: PayloadAction<ProductsItemTypes[]>) {
      state.data = action.payload;
    },
    updateProductIsLoading(state, action: PayloadAction<ProductsItemTypes[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
    });
    builder.addCase(createUpdateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUpdateProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createUpdateProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateProducts, updateProductIsLoading } = productsSlice.actions;
export default productsSlice.reducer;
