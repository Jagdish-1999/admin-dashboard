"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  deleteCategoryWithIds,
  fetchCategories,
} from "@/slices/category.slice";
import SuppressHydration from "@/lib/suppresh-hydration";
import { EachCategoryType } from "@/types/category.slice.types";
import { COLUMNS } from "./_components/columns";
import { MdDeleteForever } from "react-icons/md";
import { cn } from "@/lib/utils";
import { ImSpinner8 } from "react-icons/im";
import { ContextType } from "@/lib/column-cell-label-wrapper";
import CustomAlertDialog from "../_components/common/alert/custom-alert-dialog";
import { Table } from "../_components/common/table/table";
import { AddUpdateCategories } from "./_components/add-update-category";

const Category = () => {
  const initialState = useRef(false);
  const dispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDeletingProducts, setIsDeletingProducts] = useState<boolean>(false);

  const { data: categoriesList, isLoading } = useAppSelector(
    (state) => state.categories
  );

  const deleteCategories = useCallback(() => {
    try {
      setIsDeletingProducts(true);
      dispatch(deleteCategoryWithIds(selectedCategories));
      setSelectedCategories([]);
      setIsDeletingProducts(false);
    } catch (error) {
      console.log("[Error] when deleting many categories ", selectedCategories);
    }
  }, [dispatch, selectedCategories]);

  const onSelect = useCallback(
    (
      categories: EachCategoryType[],
      isCheched: boolean,
      selectAll?: boolean
    ) => {
      setSelectedCategories((prevCategories) => {
        if (prevCategories.includes(categories[0]._id)) {
          return prevCategories.filter((i) => i !== categories[0]._id);
        }
        return [...prevCategories, categories[0]._id];
      });
      if (selectAll) {
        setSelectedCategories(
          !isCheched
            ? categories.filter((p) => p.isDeleting).map((i) => i._id)
            : categories.map((i) => i._id)
        );
      }
    },
    []
  );

  const onCellLabelClick = useCallback(
    (context: ContextType<EachCategoryType>) => {
      switch (context.id) {
        case "checkbox": {
          if (!context.item) {
            onSelect(
              categoriesList,
              (context.methods as any).isChecked()?.checked,
              true
            );
          } else {
            onSelect(
              [context.item],
              (context.methods as any).isChecked()?.checked,
              false
            );
          }
          break;
        }
        case "delete": {
          try {
            dispatch(deleteCategoryWithIds([context.item._id]));
          } catch (error) {
            console.log(
              "Error when deleting category",
              (context.item as EachCategoryType).name
            );
          }
          break;
        }
        default: {
          console.log(`[Cell Clicked] ${context.id}`);
        }
      }
    },
    [categoriesList, dispatch, onSelect]
  );

  useEffect(() => {
    if (!categoriesList.length && !initialState.current) {
      try {
        dispatch(fetchCategories());
      } catch (error) {}
    }
    initialState.current = true;
  }, [categoriesList, dispatch]);

  const data = useMemo(
    () =>
      categoriesList.map((p) => {
        if (selectedCategories.includes(p._id)) {
          return { ...p, isSelected: true };
        }
        return { ...p, isSelected: false };
      }),
    [categoriesList, selectedCategories]
  );

  return (
    <SuppressHydration>
      <div className="flex flex-col gap-3 w-full h-full p-2 pt-0">
        <div className="w-full h-fit flex gap-2 items-end  font-dm-sans">
          <div className="flex flex-grow"></div>
          <div className="flex gap-2">
            <div
              className={cn(
                "w-fit h-full flex transition-all duration-150 ease-linear cursor-pointer font-afacad",
                !selectedCategories.length &&
                  "pointer-events-none cursor-not-allowed select-none opacity-0"
              )}
            >
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
                onContinue={deleteCategories}
                triggerChildren={
                  <div
                    className={cn(
                      "w-full h-full border opacity-100 text-sm text-red-700 border-red-500/25 hover:bg-red-500/15 bg-red-500/10 rounded-sm"
                    )}
                  >
                    {isDeletingProducts ? (
                      <div className="flex items-center justify-center w-full h-full">
                        <ImSpinner8
                          className={cn(
                            "min-w-8 min-h-8 w-8 h-8 text-red-700 transition-all animate-spin duration-700 ease-in p-2 font-semibold opacity-100"
                          )}
                        />
                        <div className="flex pr-2">Deleting...</div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "flex items-center justify-center w-full h-full"
                        )}
                      >
                        <MdDeleteForever
                          className={cn(
                            "min-w-8 min-h-8 w-8 h-8 text-red-700 transition-all duration-150 ease-in p-2 font-semibold opacity-100"
                          )}
                        />
                        <div className="flex pr-2 -ml-0.5">Delete all</div>
                      </div>
                    )}
                  </div>
                }
              >
                <span className="text-slate-900/70 font-dm-sans">
                  This action cannot be undone. This will permanently delete
                  your product and remove your data from our servers.
                </span>
              </CustomAlertDialog>
            </div>
            <AddUpdateCategories />
          </div>
        </div>

        <div className="w-full h-full relative">
          <Table<EachCategoryType>
            noDataText="No category exists"
            data={data}
            columns={COLUMNS}
            isLoading={isLoading}
            warnRows={selectedCategories}
            onCellLabelClick={onCellLabelClick}
          />
        </div>
      </div>
    </SuppressHydration>
  );
};

export default Category;
