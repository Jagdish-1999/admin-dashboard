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

    return response.data.data.map((category: EachCategoryType) => {
      const createdAt = formatDate(category.createdAt);
      const updatedAt = formatDate(category.updatedAt);
      return {
        ...category,
        createdAt,
        updatedAt,
        isDeleting: false,
        isUpdating: false,
      };
    });
  } catch (error: any) {
    console.log("Error", error);
    toast.error(error?.message);
    return [];
  }
});

export const createUpdateCategory = createAsyncThunk(
  "createUpdateCategory",
  async (payload: CreateCategoryPayload, { getState, dispatch }) => {
    const categories = (getState() as RootState).categories.data;
    try {
      if (payload?.id) {
        dispatch(
          updateCategories(
            categories.map((cat) =>
              cat.id === payload.id ? { ...cat, isUpdating: true } : cat
            )
          )
        );
      }

      let data = {} as ApiResponseTypes<EachCategoryType>;
      if (payload?.id) {
        ({ data } = await axios.put("/api/v1/category/update", payload));
      } else {
        ({ data } = await axios.post("/api/v1/category/create", payload));
      }

      let categoryResult: EachCategoryType | null = data.data;
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      const list = categories.filter((c) => c.id !== payload?.id);

      const createdAt = formatDate(categoryResult.createdAt);
      const updatedAt = formatDate(categoryResult.updatedAt);
      return [
        {
          ...categoryResult,
          isDeleting: false,
          isUpdating: false,
          createdAt,
          updatedAt,
          id: categoryResult._id,
        },
        ...list,
      ];
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error("Category name is required");
      }
      const list = categories.map((c) =>
        c.id === payload?.id ? { ...c, isUpdating: false } : c
      );
      return list;
    }
  }
);

export const deleteCategoryWithIds = createAsyncThunk(
  "deleteCategoriesWithIds",
  async (categoryIds: string[], { dispatch, getState }) => {
    const categories = (getState() as RootState).categories.data;

    dispatch(
      updateCategories(
        categories.map((cat) =>
          categoryIds.includes(cat.id) ? { ...cat, isDeleting: true } : cat
        )
      )
    );

    try {
      const response = await axios.delete("/api/v1/category/delete", {
        data: categoryIds,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(
          updateCategories(
            categories.filter((cat) => !categoryIds.includes(cat.id))
          )
        );
      } else {
        dispatch(
          updateCategories(
            categories.map((cat) =>
              categoryIds.includes(cat.id) ? { ...cat, isDeleting: false } : cat
            )
          )
        );
      }
    } catch (error) {
      console.log("Error when deleting  category", error);
    }
  }
);

const initialState: Category = {
  data: [],
  isLoading: false,
};
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.data = action.payload;
    },
  },
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

export const { updateCategories } = categorySlice.actions;

export default categorySlice.reducer;
