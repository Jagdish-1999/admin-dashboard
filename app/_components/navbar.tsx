import { GrUserAdmin } from "react-icons/gr";
import { UserProfile } from "./user-profile";
import Link from "next/link";

export const Navbar = () => {
	return (
		<div className="relative flex justify-between items-center w-full h-[56px] px-5 py-3 backdrop-blur-md bg-slate-800">
			<Link href="/" className="flex gap-2 items-center select-none">
				<GrUserAdmin />
				Ecommerse Admin
			</Link>
			<UserProfile />
		</div>
	);
};
