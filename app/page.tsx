"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Register from "@/components/register";

export default function Home() {
  const initialRef = useRef(false);
  const [isUserAuthendicated, setIsUserAuthendicated] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && initialRef.current) {
      toast.success("Login success", { description: session.user?.email });
      initialRef.current = false;
    } else if (!session && !initialRef.current) {
      initialRef.current = true;
    }
  }, [session]);

  // TODO need to add actual Authenticated logic
  if (!isUserAuthendicated) {
    return (
      <div className="flex flex-col items-center justify-center p-2">
        Please login to access dashboard
        <div className="w-full h-full rounded-md overflow-hidden">
          <Register
            isUserAuthendicated={isUserAuthendicated}
            onBackDropClick={() => setIsUserAuthendicated(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center w-full h-full">
      <div>Hello, {session?.user?.name}</div>
    </div>
  );
}
