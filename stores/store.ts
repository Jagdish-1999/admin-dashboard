import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";

import userSlice from "@/slices/user.slice";
import productsSlice from "@/slices/products.slice";
import categorySlice from "@/slices/category.slice";
import orderSlice from "@/slices/order.slice";

const rootReducer = combineReducers({
  userDetails: userSlice,
  categories: categorySlice,
  products: productsSlice,
  orders: orderSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // Add middleware and other configurations here as needed
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
