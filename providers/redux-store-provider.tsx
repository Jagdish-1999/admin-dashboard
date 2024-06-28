"use client";
import store from "@/stores/store";
import { Provider } from "react-redux";

const ReduxStoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
