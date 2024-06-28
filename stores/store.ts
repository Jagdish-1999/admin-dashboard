import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";

import productsSlice from "@/slices/products.slice";
import user from "@/slices/user.slice";

const rootReducer = combineReducers({
  userDetails: user,
  products: productsSlice,
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
