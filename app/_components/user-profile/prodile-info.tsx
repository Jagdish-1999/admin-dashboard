"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { IoLogOutOutline } from "react-icons/io5";

const ProfileInfo = () => {
  const { data: session } = useSession();
  if (!session) return;

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 px-3 py-3 bg-neutral-100/10">
        <ProfileAvatar />
        <div className="font-Poppins text-[11px] flex  flex-col justify-center">
          <div className="font-semibold">{session.user?.name}</div>
          <div className="font-extrabold text-[12px] ">
            {session.user?.email}
          </div>
        </div>
      </div>
      <Separator className="bg-neutral-500/20" />
      <div className="px-3 py-2 w-full">
        <Button
          onClick={() => [signOut()]}
          className="bg-neutral-500/15 hover:bg-neutral-500/25 gap-2 w-full text-sm rounded-sm"
        >
          <IoLogOutOutline className="w-5 h-5" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;

// Profile Avatar
export const ProfileAvatar = () => {
  const { data: session } = useSession();
  if (!session) return;

  return (
    <Avatar className="text-neutral-100/100 bg-neutral-500/90 text-[18px] h-9 w-9">
      <AvatarImage
        src={session.user?.image ?? "https://github.com/shadcn.png"}
      />
      <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
    </Avatar>
  );
};
