import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";

import productListSlice from "@/slices/product-list.slice";
import user from "@/slices/user.slice";

const rootReducer = combineReducers({
  productList: productListSlice,
  userDetails: user,
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
