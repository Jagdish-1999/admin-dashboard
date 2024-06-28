import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { CiUser } from "react-icons/ci";

interface ProfileAvatarType {
  isLoading: boolean;
  url: string;
  fallback: string | undefined;
}
const ProfileAvatar = ({ isLoading, url, fallback }: ProfileAvatarType) => {
  return (
    <Avatar
      className={cn(
        "text-neutral-100/100 bg-neutral-500/60 text-[18px] h-9 w-9",
        isLoading && "animate-pulse"
      )}
    >
      <AvatarImage
        loading="eager"
        className="object-cover object-top"
        src={url}
      />
      <AvatarFallback
        className={cn("capitalize", isLoading && "animate-pulse")}
      >
        {fallback || <CiUser strokeWidth={1} />}
      </AvatarFallback>
    </Avatar>
  );
};

export default memo(ProfileAvatar);
