import { SideLink } from "./side-link";

interface SideNabProps {
  children: React.ReactNode;
}

export const SideNav = ({ children }: SideNabProps) => {
  return (
    <div className="flex gap-2 w-full h-full overflow-hidden max-h-[calc(100-55px)]  py-2 text-inherit bg-inherit mt-[55px]">
      <SideLink />
      <div className="w-[calc(100%-205px)] h-full bg-neutral-500/20 rounded-s-sm p-3">
        {children}
      </div>
    </div>
  );
};
