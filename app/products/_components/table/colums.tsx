"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import CustomAlertDialog from "@/common/alert-dialog";
import { useAppDispatch } from "@/stores/store";
import { deleteProductWithIds } from "@/slices/products.slice";
import { MdDeleteForever } from "react-icons/md";
import { TableColumnTypes } from "@/types/table.types";
import { ReactNode } from "react";
import { CreatedUpdatedAt } from "@/common/created-updated";
import {
  ContextType,
  tableLabelTextWrapper,
} from "@/lib/column-cell-label-wrapper";
import { ProductsItemTypes } from "@/types/products.slice.types";
import { Checkbox } from "@/components/ui/checkbox";
import { ImSpinner8 } from "react-icons/im";

export interface EachColumnType {
  id: string;
  header: string;
  accessKey: string;
  classes?: string;
  headerClasses?: string;
  headerIcon?: React.ReactNode;
  icon?: React.ReactNode;
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
  hideIcon?: boolean;
  isDeleting?: boolean;
  isChecked?: boolean;
  onCheckedChange?(isChecked: any): void;
  isHeader?: boolean;
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
  hideIcon,
  isDeleting,
  isChecked,
  onCheckedChange,
  isHeader,
}: CellProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  if (id === "checkbox") {
    return (
      <td
        className={cn(
          "p-2",
          isHeader && "cursor-default",
          classes,
          headerClasses
        )}
        onClick={onClick}
      >
        <Checkbox
          checked={isChecked}
          className={cn("", isHeader && "cursor-default")}
          onCheckedChange={(check) => onCheckedChange && onCheckedChange(check)}
        />
      </td>
    );
  }

  if (id === "edit") {
    return (
      <td
        className={cn(
          "p-2 cursor-pointer",
          isHeader && "cursor-default",
          classes,
          headerClasses,
          (hideIcon || isDeleting) && "pointer-events-none select-none"
        )}
        onClick={hideIcon ? () => {} : onClick}
      >
        <CiEdit
          strokeWidth={1}
          onClick={() => {
            router.push("/products/edit");
          }}
          className={cn(
            "min-w-8 min-h-8 w-8 h-8 hover:bg-neutral-500/20 transition-all duration-150 ease-linear p-2 rounded-full  font-semibold opacity-100",
            (hideIcon || isDeleting) &&
              "opacity-0 pointer-events-none select-none"
          )}
        />
      </td>
    );
  }

  if (id === "delete") {
    return (
      <td
        className={cn(
          "p-2 cursor-pointer",
          isHeader && "cursor-default",
          classes,
          headerClasses,
          hideIcon && "pointer-events-none select-none"
        )}
        onClick={hideIcon ? () => {} : onClick}
      >
        {isDeleting ? (
          <ImSpinner8 className="min-w-8 min-h-8 w-8 h-8 text-red-700 animate-spin duration-700 hover:transition-all ease-in p-2 rounded-full  font-extrabold" />
        ) : (
          <CustomAlertDialog
            continueButtonText={() => (
              <div className="flex gap-1 items-center justify-center text-red-600 w-full h-full p-2 rounded-sm border border-red-800">
                <MdDeleteForever />
                Delete
              </div>
            )}
            dialogTitle={
              <div className="text-slate-900/90 font-semibold">
                Are you absolutely sure?
              </div>
            }
            onContinue={async () => {
              const { id } = JSON.parse(
                localStorage.getItem("edited-product") || "{}"
              );
              await dispatch(deleteProductWithIds([id]));
            }}
            triggerChildren={
              <MdDeleteForever
                className={cn(
                  "min-w-8 min-h-8 w-8 h-8 text-red-700 hover:bg-red-500/20 transition-all duration-150 ease-in p-2 rounded-full font-semibold opacity-100",
                  hideIcon && "opacity-0 pointer-events-none select-none"
                )}
              />
            }
          >
            <span className="text-slate-900/70 font-dm-sans">
              This action cannot be undone. This will permanently delete your
              product and remove your data from our servers.
            </span>
          </CustomAlertDialog>
        )}
      </td>
    );
  }

  if (showDate) {
    let date, time;
    if (showDate) [date, time] = label?.split?.(" ");

    return (
      <td
        className={cn(
          "p-2 cursor-pointer",
          isHeader && "cursor-default",
          classes,
          headerClasses
        )}
        onClick={onClick}
      >
        <div className="w-fit self-center justify-self-center m-auto">
          <h4 className="text-[10px] opacity-80 w-fit">{time}</h4>
          <h4 className="text-[11px] ">{date}</h4>
        </div>
      </td>
    );
  }

  return (
    <td
      className={cn(
        "p-2 cursor-pointer",
        isHeader && "cursor-default",
        classes,
        headerClasses
      )}
      onClick={onClick}
    >
      {headerIcon || icon || label}
    </td>
  );
}

//? render react node conversen logic
export const toReactNode = (value: any): ReactNode => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return JSON.stringify(value);
};

// export const GetColumns = () => {
//   return [
//     {
//       id: "checkbox",
//       header: "Chechbox",
//       accessKey: "checkbox",
//       classes: "w-[3%] px-2 flex items-center  justify-center py-1",
//       headerClasses: "w-[3%] px-2 flex items-center justify-center",
//     },
//     {
//       id: "product-name",
//       header: "Product Name",
//       accessKey: "productName",
//       classes:
//         "w-[18%] px-2 flex items-center line-clamp-2 py-1 text-ellipsis self-center text-[12px]",
//       headerClasses:
//         "w-[18%] px-2  flex items-center text-[14px] font-semibold",
//     },
//     {
//       id: "description",
//       header: "Description",
//       accessKey: "description",
//       classes:
//         "w-[23%] px-2 py-1 line-clamp-3 text-ellipsis self-center text-justify text-[12px]",
//       headerClasses: "w-[23%] px-2 flex items-center text-[14px] font-semibold",
//     },
//     {
//       id: "qty",
//       header: "Quantity",
//       accessKey: "qty",
//       classes: "w-[11%] px-2 py-1 flex items-center justify-center text-[12px]",
//       headerClasses:
//         "w-[11%] px-2 flex items-center  justify-center text-[14px] font-semibold",
//     },
//     {
//       id: "createdAt",
//       header: "Created At",
//       accessKey: "createdAt",
//       classes:
//         "w-[11%] px-2 py-1 line-clamp-3 text-ellipsis self-center justify-center text-center text-[12px]",
//       headerClasses:
//         "w-[11%] px-2 flex items-center justify-center text-center text-[14px] font-semibold",
//     },
//     {
//       id: "updatedAt",
//       header: "Updated At",
//       accessKey: "updatedAt",
//       classes:
//         "w-[11%] px-2 py-1 line-clamp-3 text-ellipsis self-center justify-center text-center text-[12px]",
//       headerClasses:
//         "w-[11%] px-2 flex items-center justify-center text-center text-[14px] font-semibold",
//     },
//     {
//       id: "price",
//       header: "Price",
//       accessKey: "price",
//       classes: "w-[13%] px-2 flex items-center justify-center text-[12px]",
//       headerClasses:
//         "w-[13%] px-2 flex items-center justify-center text-[14px] font-semibold",
//     },
//     {
//       id: "edit",
//       header: "",
//       accessKey: "edit",
//       headerIcon: "",
//       classes:
//         "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[12px]",
//       headerClasses:
//         "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[14px] font-semibold",
//     },
//     {
//       id: "delete",
//       header: "",
//       accessKey: "delete",
//       classes: "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center",
//       headerClasses:
//         "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center mr-1",
//     },
//   ] as EachColumnType[];
// };

export const COLUMNS = [
  {
    id: "checkbox",
    accessKey: "checkbox",
    headClasses: "flex items-center justify-center",
    className: "w-[5%] flex items-center justify-center",
    headCellLabel: function ({ item, isChecked, onCheckedChange }) {
      return (
        <Checkbox
          checked={isChecked}
          className={cn("")}
          onCheckedChange={(check: boolean) =>
            onCheckedChange && onCheckedChange(check)
          }
        />
      );
    },
    bodyCellLabel: function ({ item, isChecked, onCheckedChange }) {
      return (
        <Checkbox
          checked={isChecked}
          className={cn("")}
          onCheckedChange={(check: boolean) =>
            onCheckedChange && onCheckedChange(check)
          }
        />
      );
    },
  },
  {
    id: "product-name",
    accessKey: "productName",
    headClasses: "py-1 text-sm text-[15px] text-slate-900/80 font-semibold",
    className: "w-[20%] text-[13px] text-slate-900/75",
    headCellLabel: function () {
      return "Product Name";
    },
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  {
    id: "description",
    accessKey: "description",
    headClasses: "py-1 text-[15px] text-slate-900/80 font-semibold",
    className: "w-[30%] text-[13px] text-slate-900/75",
    headCellLabel: () => "Description",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  {
    id: "qty",
    accessKey: "qty",
    headClasses: "py-1 text-[15px] text-slate-900/80 font-semibold",
    className:
      "w-[10%] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: () => "Quantity",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  {
    id: "createdAt",
    accessKey: "createdAt",
    headClasses: "py-1 pr-2 text-[15px] text-slate-900/80 font-semibold",
    className:
      "w-[10%] flex items-center justify-center text-[13px] text-slate-900/75",
    bodyCellLabel: function ({ item }) {
      return <CreatedUpdatedAt item={item} accessKey={this.accessKey} />;
    },
    headCellLabel: () => "Created At",
  },
  {
    id: "updatedAt",
    accessKey: "updatedAt",
    headClasses: "py-1 text-[15px] text-slate-900/80 font-semibold",
    className:
      "w-[10%] flex items-center justify-center text-[13px] text-slate-900/75",
    bodyCellLabel: function ({ item }) {
      return <CreatedUpdatedAt item={item} accessKey={this.accessKey} />;
    },
    headCellLabel: () => "Updated At",
  },
  {
    id: "price",
    accessKey: "price",
    headClasses: "py-1 text-[15px] text-slate-900/80 font-semibold",
    className:
      "w-[11%] flex items-center justify-center text-[13px] text-slate-900/75",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
    headCellLabel: () => "Price",
  },
  {
    id: "edit",
    accessKey: "edit",
    headClasses: "py-1",
    className:
      "flex items-center justify-center w-[5%] min-w-[5%] text-[13px] text-slate-900/90",
    bodyCellLabel: tableLabelTextWrapper.call(
      { id: "edit", accessKey: "edit" },
      function (context: ContextType<ProductsItemTypes | unknown>): ReactNode {
        return (
          <CiEdit
            strokeWidth={1}
            onClick={() => context.onCellLabelClick(context)}
            className={cn(
              "min-w-8 min-h-8 w-8 h-8 hover:bg-neutral-500/20 transition-all duration-150 ease-linear p-2 rounded-full font-semibold opacity-100"
            )}
          />
        );
      }
    ),
    // bodyCellLabel: function ({ item, onCellLabelClick }) {
    //   const context = { ...this, item };
    //   return (
    //     <>
    //       <CiEdit
    //         strokeWidth={1}
    //         onClick={function () {
    //           onCellLabelClick?.(context);
    //         }}
    //         className={cn(
    //           "min-w-8 min-h-8 w-8 h-8 hover:bg-neutral-500/20 transition-all duration-150 ease-linear p-2 rounded-full  font-semibold opacity-100"
    //         )}
    //       />
    //     </>
    //   );
    // },
    headCellLabel: function () {
      return "";
    },
  },
  {
    id: "delete",
    accessKey: "delete",
    headClasses: "py-1 mr-1.5",
    className:
      "flex items-center justify-center w-[5%] min-w-[5%] text-[13px] text-slate-900/90",
    bodyCellLabel: tableLabelTextWrapper.call(
      { id: "delete", accessKey: "delete" },
      function (context: ContextType<ProductsItemTypes | unknown>) {
        return (
          <>
            {(context.item as ProductsItemTypes).isDeleting ? (
              <ImSpinner8 className="min-w-8 min-h-8 w-8 h-8 text-red-700 animate-spin duration-700 hover:bg-neutral-500/30 transition-all ease-in p-2 rounded-full  font-extrabold" />
            ) : (
              <CustomAlertDialog
                continueButtonText={() => (
                  <div className="flex gap-1 items-center justify-center text-red-600 w-full h-full p-2 rounded-sm border border-red-800">
                    <MdDeleteForever />
                    Delete
                  </div>
                )}
                dialogTitle={
                  <div className="text-slate-900/90 font-semibold">
                    Are you absolutely sure?
                  </div>
                }
                onContinue={async () => {
                  const { id } = JSON.parse(
                    localStorage.getItem("edited-product") || "{}"
                  );
                  context.onCellLabelClick(context);
                  // await dispatch(deleteProductWithIds([id]));
                }}
                triggerChildren={
                  <MdDeleteForever
                    className={cn(
                      "min-w-8 min-h-8 w-8 h-8 text-red-700 hover:bg-red-500/20 transition-all duration-150 ease-in p-2 rounded-full font-semibold opacity-100"
                      // hideIcon && "opacity-0 pointer-events-none select-none"
                    )}
                  />
                }
              >
                <span className="text-slate-900/70 font-dm-sans">
                  This action cannot be undone. This will permanently delete
                  your product and remove your data from our servers.
                </span>
              </CustomAlertDialog>
            )}
          </>
        );
      }
    ),
    headCellLabel: function () {
      return "";
    },
  },
] as TableColumnTypes<ProductsItemTypes>[];
