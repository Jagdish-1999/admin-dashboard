"use client";
import { SessionProvider } from "next-auth/react";

interface SessionProviderProps {
	children: React.ReactNode;
}
const MySessionProvider = ({ children }: SessionProviderProps) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default MySessionProvider;
