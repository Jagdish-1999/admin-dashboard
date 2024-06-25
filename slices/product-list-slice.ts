import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/stores/store";
import { formatDate } from "@/lib/format-date";
import { ApiResponseTypes } from "@/types/api-response.types";
import { toast } from "sonner";
import {
	ProductListItemTypes,
	ProductListTypes,
} from "@/types/product-list-slice.types";

export const fetchProductList = createAsyncThunk(
	"fetchProductList",
	async () => {
		//TODO need to handle errors
		const { data } = await axios.get("/api/v1/products");
		return data;
	}
);

export const createUpdateProductAction = createAsyncThunk(
	"createProduct",
	async ({ formData, id }: { formData: FormData; id: string }) => {
		const formHeader = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
		let data = {} as ApiResponseTypes<null>;
		if (id) {
			({ data } = await axios.put(
				`/api/v1/products/${id}`,
				formData,
				formHeader
			));
		} else {
			({ data } = await axios.post(
				"/api/v1/products/create",
				formData,
				formHeader
			));
		}
		console.log("Data", data);
		if (data.success) {
			toast.success(data.message);
		} else {
			toast.error(data.message);
		}
		return data;
	}
);

// export const updateProducts = createAsyncThunk(
// 	"updateProducts",
// 	async ({ id, formData }: { formData: FormData; id: string }) => {
// 		//TODO need to handle errors
// 		const { data }: { data: ApiResponseTypes<null> } = await axios.put(
// 			`/api/v1/products/${id}`,
// 			formData,
// 			{
// 				headers: {
// 					"Content-Type": "multipart/form-data",
// 				},
// 			}
// 		);
// 		if (data.success) {
// 			toast.success(data.message);
// 		}
// 		return data;
// 	}
// );

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
		updateProductList(state, payload: PayloadAction<ProductListItemTypes[]>) {
			state.data = payload.payload;
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
		builder.addCase(createUpdateProductAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createUpdateProductAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(createUpdateProductAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { updateProductList } = productListSlice.actions;
export default productListSlice.reducer;
