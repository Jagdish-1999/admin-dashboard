"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { RiListSettingsLine } from "react-icons/ri";
import { CustomPopover } from "@/common/popover";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import CustomAlertDialog from "@/common/alert-dialog";
import { useAppDispatch } from "@/stores/store";
import { deleteProductWithId } from "@/slices/product-list-slice";
import { HiDotsVertical } from "react-icons/hi";

export interface CellProps {
  headerIcon?: React.ReactNode | undefined;
  icon?: React.ReactNode | undefined;
  label: string;
  classes?: string;
  headerClasses?: string;
  onClick?(): void;
  showDate?: boolean;
}

export function Cell({
  icon,
  label,
  classes,
  onClick,
  headerIcon,
  headerClasses,
  showDate,
}: CellProps) {
  let date, time;
  if (showDate) [date, time] = label?.split?.(" ");
  return (
    <td className={cn("p-2", classes, headerClasses)} onClick={onClick}>
      {showDate ? (
        <div className="w-fit self-center justify-self-center m-auto">
          <h4 className="text-[10px] text-neutral-300 w-fit">{time}</h4>
          <h4 className="text-[11px] ">{date}</h4>
        </div>
      ) : (
        headerIcon || icon || label
      )}
    </td>
  );
}

export const GetColumns = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return [
    {
      id: "product-name",
      header: "Product Name",
      accessorKey: "productName",
      classes:
        "w-[20%] px-2 text-[14px] flex items-center line-clamp-2 py-1 text-ellipsis self-center text-[13px]",
      headerClasses:
        "w-[20%] px-2  text-[14px] flex items-center text-[13px] font-semibold",
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      classes:
        "w-[25%] px-2 py-1 text-[14px] line-clamp-3 text-ellipsis self-center text-justify text-[12px]",
      headerClasses:
        "w-[25%] px-2 text-[14px] flex items-center text-[13x] font-semibold",
    },
    {
      id: "qty",
      header: "Quantity",
      accessorKey: "qty",
      classes: "w-[11%] px-2 py-1 text-[14px] flex items-center justify-center",
      headerClasses:
        "w-[11%] px-2 text-[14px] flex items-center  justify-center text-[13px] font-semibold",
    },
    {
      id: "createdAt",
      header: "Created At",
      accessorKey: "createdAt",
      classes:
        "w-[12%] px-2 py-1 text-[14px] line-clamp-3 text-ellipsis self-center justify-center text-center",
      headerClasses:
        "w-[12%] px-2 text-[14px] flex items-center justify-center text-center text-[13px] font-semibold",
    },
    {
      id: "updatedAt",
      header: "Updated At",
      accessorKey: "updatedAt",
      classes:
        "w-[12%] px-2 py-1 text-[14px] line-clamp-3 text-ellipsis self-center justify-center text-center",
      headerClasses:
        "w-[12%] px-2 text-[14px] flex items-center justify-center text-center text-[13px] font-semibold",
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      classes:
        "w-[15%] px-2 text-[14px] flex items-center justify-center text-[13px]",
      headerClasses:
        "w-[15%] px-2 text-[14px] flex items-center justify-center text-[13px] font-semibold",
    },
    {
      id: "actions",
      header: "Actions",
      headerIcon: (
        <RiListSettingsLine className="min-w-4 min-h-4 h-4 w-4 font-semibold" />
      ),
      icon: (
        <CustomPopover
          triggerChildren={
            <HiDotsVertical className="hover:bg-slate-800 transition-all duration-200 ease-in p-2 rounded-full h-8 w-8 font-semibold" />
          }
        >
          <div className="flex flex-col gap-2 w-fit select-none text-[12px]">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={(evt) => {
                evt.stopPropagation();
                router.push("/products/edit");
              }}
            >
              <CiEdit />
              <h4>Edit</h4>
            </div>
            <CustomAlertDialog
              dialogTitle="Are you absolutely sure?"
              onContinue={async () => {
                //TODO need to make code clean  - need to debug this
                const { id } = JSON.parse(
                  localStorage.getItem("edited-product") || "{}"
                );
                await dispatch(deleteProductWithId({ _id: id }));
              }}
              triggerChildren={
                <div className="flex items-center gap-2 cursor-pointer">
                  <MdOutlineDelete />
                  <h4>Delete</h4>
                </div>
              }
            >
              This action cannot be undone. This will permanently delete your
              item and remove your data from our servers.
            </CustomAlertDialog>
          </div>
        </CustomPopover>
      ),
      accessorKey: "action",
      classes: "w-[5%] px-2 text-[14px] flex items-center justify-center",
      headerClasses:
        "w-[5%] px-2 text-[14px] flex items-center justify-center mr-1 text-[13px] font-semibold",
    },
  ];
};
