import { formatDate } from "@/lib/format-date";
import { RootState } from "@/stores/store";
import { ApiResponseTypes } from "@/types/api-response.types";
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

export const createUpdateCategory = createAsyncThunk(
  "createUpdateCategory",
  async (payload: CreateCategoryPayload, { getState }) => {
    let data = {} as ApiResponseTypes<EachCategoryType>;
    if (payload?.id) {
      ({ data } = await axios.post("/api/v1/category/update", payload));
    } else {
      ({ data } = await axios.post("/api/v1/category/create", payload));
    }

    let categoryResult: EachCategoryType | null = data.data;
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    const list = (getState() as RootState).categories.data.filter(
      (c) => c._id !== payload?.id
    );

    const createdAt = formatDate(categoryResult.createdAt);
    const updatedAt = formatDate(categoryResult.updatedAt);
    return [
      {
        ...categoryResult,
        isDeleting: false,
        createdAt,
        updatedAt,
        id: categoryResult._id,
      },
      ...list,
    ];
  }
);

const initialState: Category = {
  data: [],
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
    builder.addCase(createUpdateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createUpdateCategory.fulfilled,
      (state, action: PayloadAction<EachCategoryType[]>) => {
        state.data = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(createUpdateCategory.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
