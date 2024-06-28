"use client";

import { useEffect, useRef } from "react";
import { fetchUser } from "@/server-calls/fetch-user";
import { updateUser } from "@/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

const ServerCallsProvider = ({ children }: { children: React.ReactNode }) => {
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    if (initialRef.current && !isLogin) {
      (async () => {
        const user = await fetchUser();
        if (user) {
          dispatch(updateUser(user));
        }
        initialRef.current = false;
      })();
    }
  }, [dispatch, isLogin]);
  return <>{children}</>;
};

export default ServerCallsProvider;
