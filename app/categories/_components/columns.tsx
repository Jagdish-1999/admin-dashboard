import CustomAlertDialog from "@/app/_components/common/alert/custom-alert-dialog";
import { CreatedUpdatedAt } from "@/app/_components/common/created-updated";
import { CustomSelect } from "@/app/_components/common/select/custom-select";
import Input from "@/app/products/_components/Input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextType,
  tableLabelTextWrapper,
} from "@/lib/column-cell-label-wrapper";
import SuppressHydration from "@/lib/suppresh-hydration";
import { cn } from "@/lib/utils";
import { createUpdateCategory } from "@/slices/category.slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  EachCategoryType,
  ParentCategoryType,
} from "@/types/category.slice.types";
import { TableColumnTypes } from "@/types/table.types";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ImSpinner8 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { AddUpdateCategories } from "./add-update-category";

export const COLUMNS = [
  {
    id: "checkbox",
    accessKey: "checkbox",
    headClasses: "flex items-center justify-center cursor-default",
    className: "w-[5%] min-w-[40px] flex items-center justify-center",
    headCellLabel: tableLabelTextWrapper.call(
      { id: "checkbox", accessKey: "checkbox" },
      function (context: ContextType<EachCategoryType | unknown>): ReactNode {
        return (
          <Checkbox
            checked={(context.item as EachCategoryType)?.isSelected}
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
      function (context: ContextType<EachCategoryType | unknown>): ReactNode {
        return (
          <Checkbox
            checked={(context.item as EachCategoryType)?.isSelected}
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
    id: "name",
    accessKey: "name",
    headClasses:
      "py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default",
    className: "w-[25%] min-w-[120px] text-[13px] text-slate-900/75 capitalize",
    headCellLabel: function () {
      return "Category";
    },
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  {
    id: "parent",
    accessKey: "name",
    headClasses:
      "py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default",
    className: "w-[20%] min-w-[120px] text-[13px] text-slate-900/75 capitalize",
    headCellLabel: function () {
      return "Parent category";
    },
    bodyCellLabel: function ({ item }) {
      return item?.parent?.[this.accessKey as keyof ParentCategoryType];
    },
  },
  {
    id: "createdAt",
    accessKey: "createdAt",
    headClasses:
      "py-1 pr-2 text-[15px] text-slate-900/80 font-semibold cursor-default",
    className:
      "w-[20%] min-w-[90px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: function () {
      return "Created At";
    },
    bodyCellLabel: function ({ item }) {
      return <CreatedUpdatedAt item={item} accessKey={this.accessKey} />;
    },
  },
  {
    id: "updatedAt",
    accessKey: "updatedAt",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default",
    className:
      "w-[20%] min-w-[90px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: function () {
      return "Updated At";
    },
    bodyCellLabel: function ({ item }) {
      return <CreatedUpdatedAt item={item} accessKey={this.accessKey} />;
    },
  },
  {
    id: "edit",
    accessKey: "edit",
    headClasses: "py-1 cursor-default",
    className:
      "flex items-center justify-center w-[5%] min-w-[40px] text-[13px] text-slate-900/90",
    bodyCellLabel: tableLabelTextWrapper.call(
      { id: "edit", accessKey: "edit" },
      function (context: ContextType<EachCategoryType | unknown>): ReactNode {
        return (
          <AddUpdateCategories
            category={context.item as EachCategoryType}
            onCellLabelClick={context.onCellLabelClick}
          />
        );
      }
    ),
    headCellLabel: function () {
      return "";
    },
  },
  {
    id: "delete",
    accessKey: "delete",
    headClasses: "py-1 mr-1.5 cursor-default",
    disableOnWarn: true,
    className:
      "flex items-center justify-center w-[5%] min-w-[40px] text-[13px] text-slate-900/90",
    bodyCellLabel: tableLabelTextWrapper.call(
      { id: "delete", accessKey: "delete" },
      function (context: ContextType<EachCategoryType | unknown>) {
        return (
          <>
            {(context.item as EachCategoryType).isDeleting ? (
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
                  <>
                    {(context.item as EachCategoryType).isDeleting ? (
                      <ImSpinner8 className="min-w-8 min-h-8 w-8 h-8 text-red-700 animate-spin duration-700 hover:bg-neutral-500/30 transition-all ease-in p-2 rounded-full  font-extrabold" />
                    ) : (
                      <MdDeleteForever
                        className={cn(
                          "min-w-8 min-h-8 w-8 h-8 text-red-600 hover:bg-red-300/30 transition-all duration-150 ease-in p-2 rounded-full font-semibold opacity-100"
                        )}
                      />
                    )}
                  </>
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
] as TableColumnTypes<EachCategoryType>[];
