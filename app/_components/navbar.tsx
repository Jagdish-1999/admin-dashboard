import { GrUserAdmin } from "react-icons/gr";
import { UserProfile } from "./user-profile/user-profile";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full h-[56px] px-5 py-2 backdrop-blur-md bg-white text-slate-900/90">
      <Link
        href="/"
        className="flex gap-2 items-center select-none text-[17px]"
      >
        <Image
          src="/logo.svg"
          alt="logo"
          width={35}
          height={35}
          className="w-[35px] h-[35px]"
          priority
        />
        Ecommerse Admin
      </Link>
      <UserProfile />
    </div>
  );
};
