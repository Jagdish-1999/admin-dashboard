import { GrUserAdmin } from "react-icons/gr";
import { UserProfile } from "./user-profile";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full h-[56px] px-5 py-2 backdrop-blur-md bg-neutral-500/20 text-slate-900/90">
      <Link
        href="/"
        className="flex gap-2 items-center select-none text-[17px]"
      >
        <GrUserAdmin strokeWidth={3} />
        Ecommerse Admin
      </Link>
      <UserProfile />
    </div>
  );
};
