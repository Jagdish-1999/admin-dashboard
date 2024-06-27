"use client";
import { signIn, useSession } from "next-auth/react";
import { CustomPopover } from "@/common/popover";
import ProfileInfo, { ProfileAvatar } from "./prodile-info";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserProfile = () => {
  const pathname = usePathname();
  // return (
  //   <Link
  //     href={"/register"}
  //     className="border-neutral-500/10 border bg-neutral-500/15 text-sm font-semibold hover:bg-neutral-500/25 transition-all duration-100 text-slate-900/90 px-3 py-2 rounded-sm"
  //   >
  //     Login
  //   </Link>
  // );

  return (
    <CustomPopover triggerChildren={<ProfileAvatar />}>
      <ProfileInfo />
    </CustomPopover>
  );
};
