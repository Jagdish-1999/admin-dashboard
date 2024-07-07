"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import ProfileAvatar from "./profile-avatar";
import { useCallback } from "react";
import { logoutUser } from "@/slices/user.slice";
import { useImagePreloader } from "@/lib/preload-image";
import { CustomDialog } from "../common/dialog/custom-dialog";
import Register from "../register";

const ProfileInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLogin } = useAppSelector((state) => state.userDetails);
  const { imageSrc, isLoading } = useImagePreloader(user?.avatar.url || "");

  const logoutUserFun = useCallback(() => {
    dispatch(logoutUser());
    router.push("/");
  }, [dispatch, router]);

  return (
    <div className="flex flex-col w-full h-full gap-2 bg-neutral-200 rounded-sm backdrop-blur-md p-2">
      <div className="flex gap-4 px-3 py-3 bg-neutral-100/10">
        <ProfileAvatar
          url={imageSrc ? imageSrc : ""}
          fallback={user?.name[0]}
          isLoading={isLoading}
        />
        <div className="font-Poppins text-[11px] flex flex-col justify-center text-sm leading-4">
          <div className="font-semibold capitalize font-dm-sans">
            {user?.name || "User name"}
          </div>
          <div className="font-extrabold text-[12px]">
            {user?.email || "User Email"}
          </div>
        </div>
      </div>
      <hr className="border-neutral-500/50" />
      <div className="w-full h-full">
        {!isLogin ? (
          <CustomDialog
            descriptionClasses="hidden"
            titleClasses="hidden"
            className="gap-0"
            triggerChildren={
              <Button className="bg-neutral-500/15 hover:bg-neutral-400/30 w-full text-sm rounded-sm font-semibold border-neutral-400/50 transition-all duration-200">
                Login
              </Button>
            }
          >
            <Register />
          </CustomDialog>
        ) : (
          <Button
            onClick={logoutUserFun}
            className="bg-neutral-500/15 hover:bg-neutral-500/25 gap-2 w-full text-sm rounded-sm font-semibold"
          >
            <IoLogOutOutline className="w-5 h-5" />
            Sign out
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
