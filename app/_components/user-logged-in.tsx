"use client";

import { useEffect, useRef } from "react";
import {
  fetchUser,
  updateUser,
  updateUserIsLogin,
  updateUserLoading,
} from "@/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import Register from "@/app/_components/register";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

const UserLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const { isLogin, isLoading, user } = useAppSelector(
    (state) => state.userDetails
  );

  useEffect(() => {
    if (initialRef.current && !isLogin) {
      dispatch(fetchUser());
    }
    initialRef.current = false;
  }, [dispatch, isLogin]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLogin)
    return (
      <div className="w-full h-full flex items-center justify-center bg-inherit">
        <div className="border w-[32rem] max-h-fit border-neutral-300 p-6 rounded-md bg-white">
          <Register />
        </div>
      </div>
    );

  return <>{children}</>;
};

export { UserLoggedIn };
