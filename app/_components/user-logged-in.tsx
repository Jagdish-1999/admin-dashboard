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
import { useRouter } from "next/navigation";

const UserLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const { isLogin, isLoading } = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    if (initialRef.current && !isLogin) {
      (async () => {
        const user = await fetchUser();
        if (user) {
          dispatch(updateUser(user));
          dispatch(updateUserIsLogin(true));
        } else {
          router.replace("/");
        }
      })();
      dispatch(updateUserLoading(false));
    }
    initialRef.current = false;
  }, [dispatch, isLogin, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLogin && isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-200">
        <div
          className="border border-neutral-300 p-6 rounded-md bg-opacity-50 bg-neutral-50"
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

export { UserLoggedIn };
