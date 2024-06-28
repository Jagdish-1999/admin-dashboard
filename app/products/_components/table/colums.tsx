"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import CustomAlertDialog from "@/common/alert-dialog";
import { useAppDispatch } from "@/stores/store";
import { deleteProductWithId } from "@/slices/products.slice";
import { MdDeleteForever } from "react-icons/md";
import { TbReload } from "react-icons/tb";

interface EachColumnType {
  id: string;
  header: string;
  accessorKey: string;
  classes: string;
  headerClasses: string;
  headerIcon: React.ReactNode;
  icon: React.ReactNode;
}
export interface CellProps {
  id?: string;
  headerIcon?: React.ReactNode | undefined;
  icon?: React.ReactNode | undefined;
  label: string;
  classes?: string;
  headerClasses?: string;
  onClick?(): void;
  showDate?: boolean;
  isDeleting?: boolean;
}

export function Cell({
  id,
  icon,
  label,
  classes,
  onClick,
  headerIcon,
  headerClasses,
  showDate,
  isDeleting,
}: CellProps) {
  let date, time;
  if (showDate) [date, time] = label?.split?.(" ");
  return (
    <td className={cn("p-2", classes, headerClasses)} onClick={onClick}>
      {isDeleting && id === "delete" ? (
        <TbReload className="min-w-8 min-h-8 w-8 h-8 text-red-700 animate-spin duration-700 hover:bg-neutral-500/30 transition-all ease-in p-2 rounded-full  font-extrabold" />
      ) : showDate ? (
        <div className="w-fit self-center justify-self-center m-auto">
          <h4 className="text-[10px] text-neutral-900/80 w-fit">{time}</h4>
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
        "w-[18%] px-2 flex items-center line-clamp-2 py-1 text-ellipsis self-center text-[12px]",
      headerClasses:
        "w-[18%] px-2  flex items-center text-[13px] font-semibold",
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      classes:
        "w-[23%] px-2 py-1 line-clamp-3 text-ellipsis self-center text-justify text-[12px]",
      headerClasses: "w-[23%] px-2 flex items-center text-[13px] font-semibold",
    },
    {
      id: "qty",
      header: "Quantity",
      accessorKey: "qty",
      classes: "w-[11%] px-2 py-1 flex items-center justify-center text-[12px]",
      headerClasses:
        "w-[11%] px-2 flex items-center  justify-center text-[13px] font-semibold",
    },
    {
      id: "createdAt",
      header: "Created At",
      accessorKey: "createdAt",
      classes:
        "w-[12%] px-2 py-1 line-clamp-3 text-ellipsis self-center justify-center text-center text-[12px]",
      headerClasses:
        "w-[12%] px-2 flex items-center justify-center text-center text-[13px] font-semibold",
    },
    {
      id: "updatedAt",
      header: "Updated At",
      accessorKey: "updatedAt",
      classes:
        "w-[12%] px-2 py-1  line-clamp-3 text-ellipsis self-center justify-center text-center text-[12px]",
      headerClasses:
        "w-[12%] px-2 flex items-center justify-center text-center text-[13px] font-semibold",
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      classes: "w-[15%] px-2 flex items-center justify-center text-[12px]",
      headerClasses:
        "w-[15%] px-2 flex items-center justify-center text-[13px] font-semibold",
    },
    {
      id: "edit",
      header: "",
      accessorKey: "edit",
      headerIcon: "",
      icon: (
        <CiEdit
          fill="black"
          strokeWidth={1}
          onClick={() => {
            router.push("/products/edit");
          }}
          className="min-w-8 min-h-8 w-8 h-8 hover:bg-neutral-500/30 transition-all duration-150 ease-in p-2 rounded-full  font-semibold"
        />
      ),
      classes:
        "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[12px]",
      headerClasses:
        "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[13px] font-semibold",
    },
    {
      id: "delete",
      header: "",
      accessorKey: "delete",
      icon: (
        <CustomAlertDialog
          dialogTitle={
            <div className="text-slate-900/90 font-semibold">
              Are you absolutely sure?
            </div>
          }
          onContinue={async () => {
            const { id } = JSON.parse(
              localStorage.getItem("edited-product") || "{}"
            );
            await dispatch(deleteProductWithId({ _id: id }));
          }}
          triggerChildren={
            <MdDeleteForever className="min-w-8 min-h-8 w-8 h-8 text-red-700 hover:bg-neutral-500/30 transition-all duration-150 ease-in p-2 rounded-full font-semibold" />
          }
        >
          <span className="text-slate-900/70">
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </span>
        </CustomAlertDialog>
      ),
      classes:
        "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[12px]-l",
      headerClasses:
        "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[13px] font-semibold",
    },
  ] as EachColumnType[];
};
