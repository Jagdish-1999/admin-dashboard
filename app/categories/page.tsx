"use client";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Input from "../products/_components/Input";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  createUpdateCategory,
  deleteCategoryWithIds,
  fetchCategories,
} from "@/slices/category.slice";
import SuppressHydration from "@/lib/suppresh-hydration";
import { EachCategoryType } from "@/types/category.slice.types";
import { COLUMNS } from "./_components/columns";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { cn } from "@/lib/utils";
import { ImSpinner8 } from "react-icons/im";
import { ContextType } from "@/lib/column-cell-label-wrapper";
import CustomAlertDialog from "../_components/common/alert/custom-alert-dialog";
import { CustomSelect } from "../_components/common/select/custom-select";
import { Table } from "../_components/common/table/table";
import { Button } from "@/components/ui/button";
import { CustomDialog } from "../_components/common/dialog/custom-dialog";
import { AddProperties } from "./_components/add-properties";

export interface CategporyInputType {
  name: { value: string; isError: boolean };
}

export interface AddedPropertiesTypes {
  index: number;
  propertyName: string;
  propertyValue: string;
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
  const [addProperty, setAddProperty] = useState<number[]>([]);
  const [addedProperties, setAdddedProperties] = useState<
    AddedPropertiesTypes[]
  >([] as AddedPropertiesTypes[]);
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

  const handlePropertyInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>, index: number) => {
      console.log("EVT", evt.target.name, evt.target.value, index);
      setAdddedProperties((prev) =>
        prev.map((eachInput) =>
          eachInput.index === index
            ? {
                ...eachInput,
                [evt.target.name]: evt.target.value,
              }
            : eachInput
        )
      );
    },
    []
  );

  const handleAddProperty = useCallback(() => {
    setAddProperty((prev) => [prev.length + 1, ...prev]);
    setAdddedProperties((prev) => [
      ...prev,
      { index: prev.length + 1, propertyName: "", propertyValue: "" },
    ]);
  }, []);

  const handleRemoveProperty = useCallback((index: number) => {
    setAddProperty((prev) => prev.filter((idx) => idx !== index));
    setAdddedProperties((prev) =>
      prev.filter((property) => property.index !== index)
    );
  }, []);

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
      <div className="flex flex-col gap-3 w-full h-full p-2 pt-0">
        <div className="w-full h-fit flex gap-2 items-end  font-dm-sans">
          <div className="flex flex-grow"></div>
          <div className="flex gap-2">
            <div>
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
            {/* <CustomAlertDialog
              continueButtonText={() => (
                <div className="flex gap-1 items-center justify-center text-teal-700 w-full h-full p-2 text-sm rounded-sm border border-teal-600 bg-teal-100/20 hover:bg-teal-100/40 transition-all duration-150">
                  Create
                </div>
              )}
              dialogTitle="Create new category"
              onCancel={() => {
                setParentCategory("");
              }}
              onContinue={handleCreate}
              triggerChildren={
                <div className="flex items-center justify-center gap-1 text-sm border border-teal-600 font-semibold rounded-sm h-full w-fit px-2 hover:bg-teal-100/40 bg-teal-100/20 text-teal-700 transition-all duration-150 font-afacad">
                  <MdAdd className="w-5 h-5" />
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
                  required={false}
                  options={categoriesList}
                  value={parentCategory}
                  label="Parent category"
                  onChange={(val) => {
                    setParentCategory(val);
                  }}
                />
              </span>
            </CustomAlertDialog> */}
            <CustomDialog
              title="Create new category"
              triggerChildren={
                <div className="flex items-center justify-center gap-1 text-sm border border-teal-600 font-semibold rounded-sm h-full w-fit px-2 hover:bg-teal-100/40 bg-teal-100/20 text-teal-700 transition-all duration-150 font-afacad">
                  <MdAdd className="w-5 h-5" />
                  Add category
                </div>
              }
              footerContent={
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleAddProperty}>
                    Add properties
                  </Button>
                  <Button variant="outline" onClick={handleCreate}>
                    Create category
                  </Button>
                </div>
              }
            >
              <div
                className={cn(
                  "flex flex-col gap-3 h-fit",
                  addProperty.length > 0 && "flex-row w-full items-end"
                )}
              >
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
                  className="h-full"
                  required={false}
                  options={categoriesList}
                  value={parentCategory}
                  label="Parent category"
                  onChange={(val) => {
                    setParentCategory(val);
                  }}
                />
              </div>
              {addProperty.length > 0 && (
                <div
                  className="max-h-[35vh] min-w-[50vw] overflow-auto custom-scrollbar pr-1"
                  style={{ height: "100%" }}
                >
                  {addProperty.map((propertyIndex) => (
                    <AddProperties
                      key={propertyIndex}
                      index={propertyIndex}
                      currentProperty={
                        addedProperties.find(
                          (current) => current.index === propertyIndex
                        ) || ({} as AddedPropertiesTypes)
                      }
                      handleRemoveProperty={handleRemoveProperty}
                      handlePropertyInputChange={handlePropertyInputChange}
                    />
                  ))}
                </div>
              )}
            </CustomDialog>
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
