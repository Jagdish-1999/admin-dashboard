"use client";

import store from "@/stores/store";
import { Provider } from "react-redux";

export const StateProviders = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
