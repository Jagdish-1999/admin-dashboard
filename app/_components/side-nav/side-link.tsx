import { headers } from "next/headers";
import { FaBoxOpen } from "react-icons/fa";
import { HiOutlineCog } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { Links } from "./links";

export interface LinksTypes {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
}

const LINKS: LinksTypes[] = [
  {
    id: "dashboard",
    href: "/",
    label: "Dashboard",
    icon: <LuLayoutDashboard strokeWidth={3} />,
  },
  {
    id: "products",
    href: "/products",
    label: "Products",
    icon: <AiFillProduct strokeWidth={3} />,
  },
  {
    id: "orders",
    href: "/orders",
    label: "Orders",
    icon: <FaBoxOpen />,
  },
  {
    id: "settings",
    href: "/settings",
    label: "Settings",
    icon: <HiOutlineCog strokeWidth={3} />,
  },
];
export const SideLink = () => {
  const header = headers();
  const url = header.get("referer") || header.get("host");
  const pathname = new URL(url || "").pathname;

  console.log(pathname);
  return (
    <div className="w-[200px] h-full flex flex-col gap-2 rounded-e-sm pt-2 px-2 bg-neutral-500/20">
      {LINKS.map((link) => (
        <Links link={link} key={link.id} />
      ))}
    </div>
  );
};
