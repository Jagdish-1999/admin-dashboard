import { formatDate } from "@/lib/format-date";
import { RootState } from "@/stores/store";
import {
  Category,
  CreateCategoryPayload,
  EachCategoryType,
} from "@/types/category.slice.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const response = await axios.get("/api/v1/category");

    if (response.status === 200) {
      //   throw new Error("Error occur when fetching categories");
      return response.data.data.map((category: EachCategoryType) => {
        const createdAt = formatDate(category.createdAt);
        const updatedAt = formatDate(category.updatedAt);
        return { ...category, createdAt, updatedAt };
      });
    } else {
    }
  } catch (error: any) {
    console.log("Error", error);
    toast.error(error?.message);
  }
});

export const createCategory = createAsyncThunk<
  EachCategoryType[] | null,
  CreateCategoryPayload,
  { state: RootState }
>("createCategory", async (payload, { getState }) => {
  const response = await axios.post("/api/v1/category/create", payload);

  if (response.status === 201) {
    const category: EachCategoryType = response.data.data;
    const createdAt = formatDate(category.createdAt);
    const updatedAt = formatDate(category.updatedAt);
    const updatedCategory = {
      ...category,
      createdAt,
      updatedAt,
      id: category._id,
    };
    const state = getState();
    if (state.categories.data) {
      return [...state.categories.data, updatedCategory];
    } else {
      return [updatedCategory];
    }
  } else {
    toast.error("Category not created");
    return null;
  }
});

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
          state.isLoading = false;
        }
      );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createCategory.fulfilled,
      (state, action: PayloadAction<EachCategoryType[] | null>) => {
        state.data = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(createCategory.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
