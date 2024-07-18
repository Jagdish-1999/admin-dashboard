import { OrderTypes } from "@/app/orders/page";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async (): Promise<OrderTypes[]> => {
    try {
      const { data }: { data: AxiosResponse<OrderTypes[]> } =
        await axios.get("/api/v1/orders");
      return data.data;
    } catch (error: any) {
      console.log("Error", error.response);
      return [];
    }
  }
);

const initialState = {
  data: [] as OrderTypes[],
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<OrderTypes[]>) => {
          state.data = action.payload;
          state.isLoading = false;
        }
      ),
      builder.addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export { fetchOrders };

export const {} = orderSlice.actions;

export default orderSlice.reducer;
