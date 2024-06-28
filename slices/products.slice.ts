import axios from "axios";
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

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  //TODO need to handle errors
  const { data } = await axios.get("/api/v1/products");

  const modifiedProducts = data.data.map((product: ProductsItemTypes) => {
    const createdAt = formatDate(product.createdAt);
    const updatedAt = formatDate(product.updatedAt);
    return { ...product, createdAt, updatedAt, isDeleting: false };
  });
  return modifiedProducts;
});

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
  ) => {
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

    let data = {} as ApiResponseTypes<null>;
    if (id) {
      ({ data } = await axios.put(`/api/v1/products/${id}`, formData, {
        headers: formHeaders,
      }));
    } else {
      ({ data } = await axios.post("/api/v1/products/create", formData, {
        headers: formHeaders,
      }));
    }

    const productResult = data.data! as ProductsItemTypes;

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    const list = (getState() as RootState).products.data;

    const createdAt = formatDate(productResult.createdAt);
    const updatedAt = formatDate(productResult.updatedAt);
    return [
      { ...productResult, isDeleting: false, createdAt, updatedAt },
      ...list,
    ];
  }
);

export const deleteProductWithId = createAsyncThunk(
  "deleteProductWithId",
  async ({ _id }: { _id: string }, { dispatch, getState }) => {
    //TODO need to handle errors
    const productList = (getState() as RootState).products.data;
    dispatch(
      updateProducts(
        productList.map((product: ProductsItemTypes) =>
          product._id == _id ? { ...product, isDeleting: true } : product
        )
      )
    );
    const { data }: { data: ApiResponseTypes<null> } = await axios.delete(
      `/api/v1/products/${_id}`
    );
    if (data.success) {
      const productList = (getState() as RootState).products.data;
      dispatch(
        updateProducts(
          productList.filter(
            (product: ProductsItemTypes) => product._id !== _id
          )
        )
      );
      toast.success(data.message);
    }
    return data;
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
