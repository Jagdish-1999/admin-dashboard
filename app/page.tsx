"use client";
import SuppressHydration from "@/lib/suppresh-hydration";
import { useAppSelector } from "@/stores/store";

export default function Home() {
  const { user, isLogin, isLoading } = useAppSelector(
    (state) => state.userDetails
  );

  return (
    <SuppressHydration>
      <div className="flex flex-col gap-2 items-center w-full h-full">
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
