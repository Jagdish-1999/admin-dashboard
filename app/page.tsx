"use client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Home() {
  const initialRef = useRef(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && initialRef.current) {
      toast.success("Login success", { description: session.user?.email });
      initialRef.current = false;
    } else if (!session && !initialRef.current) {
      initialRef.current = true;
    }
  }, [session]);

  if (!session) {
    return (
      <div className="flex items-center justify-center p-2">
        Please login to access dashboard
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-2">
      <div>Hello, {session?.user?.name}</div>
    </div>
  );
}
