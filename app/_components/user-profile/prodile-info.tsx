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
		<div className="flex flex-col w-full h-full">
			<div className="flex gap-4 text-[14px] px-3 py-3 pb-6">
				<ProfileAvatar />
				<div className="font-Poppins text-[12px] flex  flex-col justify-center">
					<div className="font-semibold">{session.user?.name}</div>
					<div>{session.user?.email}</div>
				</div>
			</div>
			<Separator className="opacity-75 bg-neutral-500" />
			<div className="px-3 py-2 w-full">
				<Button
					onClick={() => [signOut()]}
					className="bg-slate-600 hover:bg-slate-500 gap-2 w-full">
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
		<Avatar className="text-[#eee] bg-slate-700 text-[18px] h-9 w-9">
			<AvatarImage
				src={session.user?.image ?? "https://github.com/shadcn.png"}
			/>
			<AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
		</Avatar>
	);
};
