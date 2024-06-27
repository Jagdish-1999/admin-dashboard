import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/stores/store";
import { formatDate } from "@/lib/format-date";
import { ApiResponseTypes } from "@/types/api-response.types";
import { toast } from "sonner";
import {
  CreateUpdateProductTypes,
  ProductListItemTypes,
  ProductListTypes,
} from "@/types/product-list.slice.types";
import { formHeaders } from "@/lib/form.header";
import { DESCRIPTION, PRICE, PRODUCT_NAME, QUANTITY } from "@/types";

export const fetchProductList = createAsyncThunk(
  "fetchProductList",
  async () => {
    //TODO need to handle errors
    const { data } = await axios.get("/api/v1/products");
    return data;
  }
);

export const createUpdateProduct = createAsyncThunk(
  "createProduct",
  async ({
    payload,
    id,
  }: {
    payload: CreateUpdateProductTypes;
    id: string;
  }) => {
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

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data;
  }
);

export const deleteProductWithId = createAsyncThunk(
  "deleteProductWithId",
  async ({ _id }: { _id: string }, { dispatch, getState }) => {
    //TODO need to handle errors
    const { data }: { data: ApiResponseTypes<null> } = await axios.delete(
      `/api/v1/products/${_id}`
    );
    if (data.success) {
      const productList = (getState() as RootState).productList.data;
      dispatch(
        updateProductList(productList.filter((product) => product._id !== _id))
      );
      toast.success(data.message);
    }
    return data;
  }
);

const initialState: ProductListTypes = {
  data: [],
  isLoading: false,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    updateProductList(state, action: PayloadAction<ProductListItemTypes[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.data = action.payload.data.map((product: ProductListItemTypes) => {
        const createdAt = formatDate(product.createdAt);
        const updatedAt = formatDate(product.updatedAt);
        return { ...product, createdAt, updatedAt };
      });
      state.isLoading = false;
    });
    builder.addCase(fetchProductList.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
    });
    builder.addCase(createUpdateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUpdateProduct.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createUpdateProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateProductList } = productListSlice.actions;
export default productListSlice.reducer;
