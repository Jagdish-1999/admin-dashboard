import {
  Category,
  CreateCategoryPayload,
  EachCategoryType,
} from "@/types/category.slice.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const response = await axios.get("/api/v1/category");

    if (response.status === 200) {
      //   throw new Error("Error occur when fetching categories");
      return response.data.data;
    } else {
    }
  } catch (error: any) {
    console.log("Error", error);
    toast.error(error?.message);
  }
});

export const createCategory = createAsyncThunk(
  "createCategory",
  async (payload: CreateCategoryPayload) => {
    const response = await axios.post("/api/v1/category/create", payload);
    console.log("Category Response", response);
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      console.log("Else ");
      throw new Error("Category not created");
    }
  }
);

const initialState: Category = {
  data: null,
  isLoading: false,
};
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<EachCategoryType[]>) => {
          state.data = action.payload;
        }
      );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createCategory.pending, () => {});
    builder.addCase(createCategory.fulfilled, () => {});
    builder.addCase(createCategory.rejected, () => {});
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
