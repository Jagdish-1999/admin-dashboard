"use client";
import SuppressHydration from "@/lib/suppresh-hydration";
import { useAppSelector } from "@/stores/store";
import { ImSpinner8 } from "react-icons/im";

export default function Home() {
  const { user, isLogin, isLoading } = useAppSelector(
    (state) => state.userDetails
  );

  return (
    <SuppressHydration>
      <div className="flex flex-col gap-2 items-center w-full h-full">
        {isLoading && (
          <div className="flex w-full h-full items-center justify-center">
            <ImSpinner8 className="w-12 h-12 text-neutral-500 animate-spin duration-1000 transition-all ease-in" />
          </div>
        )}
        {!isLogin && !isLoading && (
          <div className="flex flex-col items-center justify-center p-2">
            Please login to access dashboard
          </div>
        )}
        {!isLoading && isLogin && (
          <div className="capitalize">Hello, {user?.name}</div>
        )}
      </div>
    </SuppressHydration>
  );
}
