"use client";

import { useEffect, useRef } from "react";
import { fetchUser } from "@/server-calls/fetch-user";
import {
  updateUser,
  updateUserIsLogin,
  updateUserLoading,
} from "@/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import Register from "@/app/_components/register";
import Loading from "@/app/loading";

const ServerCallsProvider = ({ children }: { children: React.ReactNode }) => {
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const { isLogin, isLoading } = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    if (initialRef.current && !isLogin) {
      (async () => {
        const user = await fetchUser();
        if (user) {
          dispatch(updateUser(user));
          dispatch(updateUserLoading(false));
          dispatch(updateUserIsLogin(true));
        }
      })();
    }
    initialRef.current = false;
  }, [dispatch, isLogin]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLogin)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="border border-neutral-300 p-6 rounded-md "
          style={{
            width: "32rem",
            maxHeight: "fit-content",
          }}
        >
          <Register />
        </div>
      </div>
    );

  return <>{children}</>;
};

export default ServerCallsProvider;
