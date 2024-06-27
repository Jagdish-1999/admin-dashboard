"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IoLogOutOutline } from "react-icons/io5";

const ProfileInfo = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 px-3 py-3 bg-neutral-100/10">
        <ProfileAvatar />
        <div className="font-Poppins text-[11px] flex  flex-col justify-center">
          <div className="font-semibold">User name</div>
          <div className="font-extrabold text-[12px] ">User Email</div>
        </div>
      </div>
      <Separator className="bg-neutral-500/20" />
      <div className="px-3 py-2 w-full">
        {/* //todo need to add login when user is logged in */}
        {true && (
          <Button
            onClick={() => {
              setTimeout(() => {
                router.push("/register");
              }, 300);
            }}
            className="bg-neutral-500/15 hover:bg-neutral-500/25 gap-2 w-full text-sm rounded-sm"
          >
            Login
          </Button>
        )}
        {/* //todo need to add login when user is logged in */}
        {false && (
          <Button
            // todo need to add logout button  action
            onClick={() => {}}
            className="bg-neutral-500/15 hover:bg-neutral-500/25 gap-2 w-full text-sm rounded-sm"
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

// Profile Avatar
export const ProfileAvatar = () => {
  return (
    <Avatar className="text-neutral-100/100 bg-neutral-500/90 text-[18px] h-9 w-9">
      <AvatarImage src={"https://github.com/shadcn.png"} />
      <AvatarFallback>{"J"}</AvatarFallback>
    </Avatar>
  );
};
