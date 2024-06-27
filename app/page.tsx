"use client";
import { useEffect, useRef } from "react";
import { fetchUser } from "@/lib/fetchUser";
import { updateUser } from "@/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function Home() {
  const initialRef = useRef(true);
  const { user, isLoading } = useAppSelector((state) => state.userDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (initialRef.current) {
        const user = await fetchUser();
        dispatch(updateUser(user));
        initialRef.current = false;
      }
    })();
  }, [dispatch]);

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  // TODO need to add actual Authenticated logic
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-2">
        Please login to access dashboard
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center w-full h-full">
      <div>Hello, {user?.name}</div>
    </div>
  );
}
