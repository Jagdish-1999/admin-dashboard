"use client";
import { CustomPopover } from "@/common/popover";
import ProfileInfo from "./prodile-info";
import { useAppSelector } from "@/stores/store";
import ProfileAvatar from "./profile-avatar";
import { useImagePreloader } from "@/lib/preload-image";

export const UserProfile = () => {
  const user = useAppSelector((state) => state.userDetails.user);
  const { imageSrc, isLoading } = useImagePreloader(user?.avatar.url || "");

  return (
    <CustomPopover
      triggerChildren={
        <ProfileAvatar
          isLoading={isLoading}
          url={imageSrc ? imageSrc : ""}
          fallback={user?.name[0]}
        />
      }
    >
      <ProfileInfo />
    </CustomPopover>
  );
};
