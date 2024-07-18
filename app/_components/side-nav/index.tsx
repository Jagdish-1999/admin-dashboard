import { SideLink } from "./side-link";

interface SideNabProps {
  children: React.ReactNode;
}

export const SideNav = ({ children }: SideNabProps) => {
  return (
    <div className="flex gap-2 w-full overflow-hidden max-h-[calc(100-55px)] h-full text-inherit bg-transparent">
      <SideLink />
      <div className="w-[calc(100%-205px)] h-full bg-white rounded-s-sm p-3">
        {children}
      </div>
    </div>
  );
};
