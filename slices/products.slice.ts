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

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (): Promise<any> => {
    const { data } = await axios.get("/api/v1/products");

    const modifiedProducts = data.data.map((product: ProductsItemTypes) => {
      const createdAt = formatDate(product.createdAt);
      const updatedAt = formatDate(product.updatedAt);
      return {
        ...product,
        createdAt,
        updatedAt,
        isDeleting: false,
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
      _id,
    }: {
      payload: CreateUpdateProductTypes;
      _id?: string;
    },
    { getState }
  ): Promise<any> => {
    const formData = new FormData();
    const existingImages: string[] = [];

    payload.images.forEach((files) => {
      if (files.file) formData.append("images", files.file);
      else if (files.id) existingImages.push(files.id);
    });

    if (existingImages.length)
      formData.append("images", JSON.stringify(existingImages));

    formData.append("payload", JSON.stringify(payload));

    let data = {} as ApiResponseTypes<ProductsItemTypes>;
    if (_id) {
      ({ data } = await axios.put(`/api/v1/products/${_id}`, formData, {
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
      (p) => p._id !== _id
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
