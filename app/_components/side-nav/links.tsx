"use client";
import Link from "next/link";
import { LinksTypes } from "./side-link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Links = ({ link }: { link: LinksTypes }) => {
  const pathname = usePathname();
  return (
    <Link
      key={link.id}
      href={link.href}
      className={cn(
        "flex gap-2 items-center p-2 transition-all duration-150 hover:bg-neutral-500/15 rounded-sm text-[14px]",
        (pathname.split("/").includes(link.id) || pathname === link.href) &&
          "bg-neutral-500/15 border-neutral-500/20"
      )}
    >
      {link.icon}
      <span className="truncate text-slate-900/90">{link.label}</span>
    </Link>
  );
};
