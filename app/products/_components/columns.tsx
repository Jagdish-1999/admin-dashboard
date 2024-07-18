import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import CustomAlertDialog from "@/app/_components/common/alert/custom-alert-dialog";
import { CreatedUpdatedAt } from "@/app/_components/common/created-updated";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextType,
  tableLabelTextWrapper,
} from "@/lib/column-cell-label-wrapper";
import { ProductsItemTypes } from "@/types/products.slice.types";
import { TableColumnTypes } from "@/types/table.types";
import { ImSpinner8 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { AddUpdateProduct } from "./add-update-product";
import { ProductTypes } from "@/types";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";

export const COLUMNS = [
  {
    id: "checkbox",
    accessKey: "checkbox",
    headClasses: "flex items-center justify-center cursor-default",
    className: "w-[5%] min-w-[40px] flex items-center justify-center",
    headCellLabel: tableLabelTextWrapper.call(
      { id: "checkbox", accessKey: "checkbox" },
      function (context: ContextType<ProductsItemTypes | unknown>): ReactNode {
        return (
          <Checkbox
            checked={(context.item as ProductsItemTypes)?.isSelected}
            onCheckedChange={(checked: boolean) => {
              (context.methods.isChecked = function () {
                return { ...this, ...context, checked };
              }),
                context.onCellLabelClick();
            }}
          />
        );
      }
    ),
    bodyCellLabel: tableLabelTextWrapper.call(
      { id: "checkbox", accessKey: "checkbox" },
      function (context: ContextType<ProductsItemTypes | unknown>): ReactNode {
        return (
          <Checkbox
            checked={(context.item as ProductsItemTypes)?.isSelected}
            className={cn()}
            onCheckedChange={(checked: boolean) => {
              (context.methods.isChecked = function () {
                return { ...this, ...context, checked };
              }),
                context.onCellLabelClick();
            }}
          />
        );
      }
    ),
  },
  {
    id: "product-name",
    accessKey: "name",
    headClasses:
      "py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[20%] min-w-[120px] text-[13px] text-slate-900/75 cursor-default",
    headCellLabel: function () {
      return "Product Name";
    },
    bodyCellLabel: function ({ item }) {
      return (
        <div className="line-clamp-2 py-1 overflow-hidden leading-[18px]">
          {item[this.accessKey]}
        </div>
      );
    },
  },
  {
    id: "description",
    accessKey: "description",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[30%] min-w-[150px] text-[13px] text-slate-900/75 cursor-default",
    headCellLabel: () => "Description",
    bodyCellLabel: function ({ item }) {
      return (
        <div className="line-clamp-3 py-1 overflow-hidden leading-[18px]">
          {item[this.accessKey]}
        </div>
      );
    },
  },
  {
    id: "Quantity",
    accessKey: "quantity",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[10%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    headCellLabel: () => "Quantity",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  {
    id: "createdAt",
    accessKey: "createdAt",
    headClasses:
      "py-1 pr-0 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[10%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    bodyCellLabel: function ({ item }) {
      const createdAt = formatDate(item.createdAt);
      return (
        <CreatedUpdatedAt
          item={{ ...item, createdAt }}
          accessKey={this.accessKey}
        />
      );
    },
    headCellLabel: () => "Created At",
  },
  {
    id: "updatedAt",
    accessKey: "updatedAt",
    headClasses: "py-1 text-[15px] text-slate-900/80 font-semibold select-none",
    className:
      "w-[10%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    bodyCellLabel: function ({ item }) {
      const updatedAt = formatDate(item.updatedAt);
      return (
        <CreatedUpdatedAt
          item={{ ...item, updatedAt }}
          accessKey={this.accessKey}
        />
      );
    },
    headCellLabel: () => "Updated At",
  },
  {
    id: "price",
    accessKey: "price",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[11%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
    headCellLabel: () => "Price",
  },
  {
    id: "edit",
    accessKey: "edit",
    headClasses: "py-1 cursor-default select-none",
    className:
      "flex items-center justify-center w-[5%] min-w-[5%] text-[13px] text-slate-900/90",
    bodyCellLabel: tableLabelTextWrapper.call(
      { id: "edit", accessKey: "edit" },
      function (context: ContextType<ProductsItemTypes | unknown>): ReactNode {
        return (
          <AddUpdateProduct
            product={context.item as ProductTypes}
            onCellLabelClick={context.onCellLabelClick}
          />
        );
      }
    ),
    headCellLabel: () => "",
  },
  {
    id: "delete",
    accessKey: "delete",
    headClasses: "py-1 mr-1.5 cursor-default select-none",
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
                  context.onCellLabelClick();
                }}
                triggerChildren={
                  <MdDeleteForever
                    className={cn(
                      "min-w-8 min-h-8 w-8 h-8 text-red-600 hover:bg-red-500/20 transition-all duration-150 ease-in p-2 rounded-full font-semibold opacity-100"
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
    headCellLabel: () => "",
  },
] as TableColumnTypes<ProductsItemTypes>[];
