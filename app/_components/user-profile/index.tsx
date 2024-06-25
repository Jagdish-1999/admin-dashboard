"use client";

import { signIn, useSession } from "next-auth/react";
import { CustomPopover } from "@/common/popover";
import ProfileInfo, { ProfileAvatar } from "./prodile-info";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const UserProfile = () => {
  const { data: session } = useSession();

  if (session === undefined) return;

  if (!session)
    return (
      <Button
        className="flex gap-2 border-slate-600 border"
        onClick={async () => {
          await signIn("google");
        }}
      >
        <FcGoogle className="w-5 h-5" />
        <span> Sign</span>
      </Button>
    );

  return (
    <CustomPopover triggerChildren={<ProfileAvatar />}>
      <ProfileInfo />
    </CustomPopover>
  );
};
