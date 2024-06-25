"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaBoxOpen } from "react-icons/fa";
import { RiListCheck2 } from "react-icons/ri";
import { HiOutlineCog } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const LINKS = [
	{
		id: "dashboard",
		href: "/",
		label: "Dashboard",
		Icon: LuLayoutDashboard,
	},
	{
		id: "products",
		href: "/products",
		label: "Products",
		Icon: FaBoxOpen,
	},
	{
		id: "orders",
		href: "/orders",
		label: "Orders",
		Icon: RiListCheck2,
	},
	{
		id: "settings",
		href: "/settings",
		label: "Settings",
		Icon: HiOutlineCog,
	},
];

interface SideNabProps {
	children: React.ReactNode;
}

export const SideNav = ({ children }: SideNabProps) => {
	const pathname = usePathname();
	const [isRendered, setIsRendered] = useState(false);

	useEffect(() => {
		if (window) {
			setIsRendered(true);
		}
	}, []);

	if (!isRendered) {
		return null;
	}

	return (
		<div className="flex gap-0.5 w-full h-[calc(100%-54px)] py-0.5">
			<div className="w-[15%] min-w-[150px] h-full flex flex-col gap-2 rounded-e-sm pt-2 bg-slate-800 px-2">
				{LINKS.map((link) => (
					<Link
						key={link.id}
						href={link.href}
						className={cn(
							"flex gap-2 items-center p-2 transition-all duration-200 hover:bg-slate-900/50 rounded-sm text-[14px]",
							(pathname.split("/").includes(link.id) ||
								pathname === link.href) &&
								"bg-slate-900/50"
						)}>
						<link.Icon />
						<span className="truncate">{link.label}</span>
					</Link>
				))}
			</div>

			<div className="w-[calc(100%-155px)] h-full bg-slate-800  rounded-s-sm p-3">
				{children}
			</div>
		</div>
	);
};
