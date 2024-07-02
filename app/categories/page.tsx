"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Input from "../products/_components/Input";
import { IoCreateOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  createUpdateCategory,
  deleteCategoryWithIds,
  fetchCategories,
} from "@/slices/category.slice";
import CustomAlertDialog from "@/common/alert-dialog";
import SuppressHydration from "@/lib/suppresh-hydration";
import { Table } from "@/common/table";
import { EachCategoryType } from "@/types/category.slice.types";
import { COLUMNS } from "./_components/columns";
import { MdDeleteForever } from "react-icons/md";
import { cn } from "@/lib/utils";
import { ImSpinner8 } from "react-icons/im";
import { ContextType } from "@/lib/column-cell-label-wrapper";
import { CustomSelect } from "@/common/custom-select";

export interface CategporyInputType {
  name: { value: string; isError: boolean };
}

const initialCategoryInput: CategporyInputType = {
  name: { value: "", isError: true },
};

const Category = () => {
  const initialState = useRef(false);
  const dispatch = useAppDispatch();
  const [categoryInput, setCategoryInput] =
    useState<CategporyInputType>(initialCategoryInput);
  const [parentCategory, setParentCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDeletingProducts, setIsDeletingProducts] = useState<boolean>(false);

  const { data: categoriesList, isLoading } = useAppSelector(
    (state) => state.categories
  );

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryInput({
        name: { value: evt.target.value, isError: !evt.target.value },
      });
    },
    []
  );

  const handleCreate = useCallback(() => {
    (async () => {
      try {
        dispatch(
          createUpdateCategory({
            name: categoryInput.name.value,
            parent: parentCategory,
          })
        );
        setCategoryInput(initialCategoryInput);
      } catch (error) {}
    })();
  }, [categoryInput.name.value, dispatch, parentCategory]);

  // todo need to add delete functionality
  const deleteCategories = useCallback(() => {
    try {
      dispatch(deleteCategoryWithIds(selectedCategories));
      setSelectedCategories([]);
    } catch (error) {
      console.log("Error when deleting many categories ", selectedCategories);
    }
  }, [dispatch, selectedCategories]);

  const onSelect = useCallback(
    (
      categories: EachCategoryType[],
      isCheched: boolean,
      selectAll?: boolean
    ) => {
      setSelectedCategories((prevCategories) => {
        if (prevCategories.includes(categories[0].id)) {
          return prevCategories.filter((i) => i !== categories[0].id);
        }
        return [...prevCategories, categories[0].id];
      });
      if (selectAll) {
        setSelectedCategories(
          !isCheched
            ? categories.filter((p) => p.isDeleting).map((i) => i.id)
            : categories.map((i) => i.id)
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
            setIsDeletingProducts(true);
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
            dispatch(
              deleteCategoryWithIds([(context.item as EachCategoryType).id])
            );
          } catch (error) {
            console.log(
              "Error when deleting category",
              (context.item as EachCategoryType).name
            );
          }
          break;
        }
        default: {
          console.log(
            "[Cell Clicked] Nothing is happining on cell click in category page"
          );
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
        if (selectedCategories.includes(p.id)) {
          return { ...p, isSelected: true };
        }
        return { ...p, isSelected: false };
      }),
    [categoriesList, selectedCategories]
  );

  return (
    <SuppressHydration>
      <div className="flex flex-col gap-2 w-full h-full p-2 pt-0">
        <div className="w-full h-fit flex gap-2 items-end  font-dm-sans">
          <div className="flex flex-grow"></div>
          <div className="flex gap-2">
            <div className="">
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
            </div>
            <CustomAlertDialog
              continueButtonText={() => (
                <div className="flex gap-1 items-center justify-center text-neutral-900/90 hover:text-slaate-900/80 w-full h-full p-2 text-sm rounded-sm border border-neutral-500/50 bg-neutral-500/10 hover:bg-neutral-500/15 transition-all duration-150">
                  <IoCreateOutline strokeWidth={2} className="w-4 h-4" />
                  Create
                </div>
              )}
              dialogTitle="Create new category"
              onCancel={() => {
                setParentCategory("");
              }}
              onContinue={handleCreate}
              triggerChildren={
                <div className="flex items-center justify-center gap-1 p-2 text-sm border border-neutral-500/20 font-semibold rounded-sm h-full w-32 hover:bg-neutral-500/20 bg-neutral-500/15 text-neutral-900/80 hover:text-neutral-900/80 transition-all duration-150 font-afacad">
                  <IoCreateOutline strokeWidth={2} className="w-5 h-5 " />
                  Add category
                </div>
              }
            >
              <span className="flex flex-col gap-3">
                <Input
                  required
                  type="text"
                  id="category"
                  label="Category"
                  name="category"
                  error={categoryInput.name.isError}
                  value={categoryInput.name.value}
                  placeholder="Category name"
                  onChange={handleChange}
                />
                <CustomSelect
                  options={categoriesList}
                  value={parentCategory}
                  onChange={(val) => {
                    setParentCategory(val);
                  }}
                />
              </span>
            </CustomAlertDialog>
          </div>
        </div>

        <div className="w-full h-full relative">
          <Table<EachCategoryType>
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
