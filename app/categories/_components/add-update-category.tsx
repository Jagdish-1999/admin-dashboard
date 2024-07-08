import { CustomDialog } from "@/app/_components/common/dialog/custom-dialog";
import { CustomSelect } from "@/app/_components/common/select/custom-select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MdAdd } from "react-icons/md";
import { AddProperties } from "./add-properties";
import { ChangeEvent, useCallback, useState } from "react";
import { createUpdateCategory } from "@/slices/category.slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import Input from "@/app/products/_components/Input";
import { EachCategoryType } from "@/types/category.slice.types";
import { ImSpinner8 } from "react-icons/im";
import { CiEdit } from "react-icons/ci";

export interface AddedPropertiesTypes {
  propertyName: string;
  propertyValue: string;
}

interface AddUpdateCategoriesProps {
  category?: EachCategoryType;
  onCellLabelClick?(): void;
}

const AddUpdateCategories = ({
  category,
  onCellLabelClick,
}: AddUpdateCategoriesProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState<string>(
    category ? category.name : ""
  );
  const [parentCategory, setParentCategory] = useState(
    category ? category.parent?._id : ""
  );
  const [addProperty, setAddProperty] = useState<number[]>(
    category ? category.properties.map((_, idx) => idx) : []
  );
  const [addedProperties, setAdddedProperties] = useState<
    AddedPropertiesTypes[]
  >(
    category
      ? category.properties.map((each) => ({
          propertyName: each.name,
          propertyValue: each.values?.join(","),
        }))
      : []
  );

  const categories = useAppSelector((state) => state.categories.data);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryName(evt.target.value);
    },
    []
  );

  const handlePropertyInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>, index: number) => {
      setAdddedProperties((prev) =>
        prev.map((eachInput, idx) =>
          idx === index
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
    setAddProperty((prev) => [prev.length, ...prev]);
    setAdddedProperties((prev) => [
      ...prev,
      { propertyName: "", propertyValue: "" },
    ]);
  }, []);

  const handleRemoveProperty = useCallback((index: number) => {
    setAddProperty((prev) => prev.filter((_, idx) => idx !== index));
    setAdddedProperties((prev) => prev.filter((_, idx) => idx !== index));
  }, []);

  const handleCreateUpdate = useCallback(() => {
    dispatch(
      createUpdateCategory({
        _id: category?._id,
        name: categoryName,
        parent: parentCategory.trim(),
        properties: addedProperties,
      })
    );
    if (!category?._id) {
      setCategoryName("");
      setAddProperty([]);
      setAdddedProperties([]);
      setParentCategory("");
    }
    setOpen(false);
  }, [addedProperties, category?._id, categoryName, dispatch, parentCategory]);

  return (
    <CustomDialog
      open={open}
      onOpenChange={(oopen) => {
        setOpen(oopen);
      }}
      title={category ? "Update category" : "Create new category"}
      triggerChildren={
        category ? (
          <div className="text-green-700">
            {category.isUpdating ? (
              <ImSpinner8
                className={cn(
                  "min-w-8 min-h-8 w-8 h-8 text-green-700 transition-all animate-spin duration-700 ease-in p-2 font-semibold opacity-100"
                )}
              />
            ) : (
              <CiEdit
                strokeWidth={1}
                onClick={() => {
                  onCellLabelClick?.();
                }}
                className={cn(
                  "min-w-8 min-h-8 w-8 h-8 hover:bg-green-500/20 transition-all duration-150 ease-linear p-2 rounded-full font-semibold opacity-100"
                )}
              />
            )}
          </div>
        ) : (
          <Button className="flex items-center justify-center gap-1 text-sm border border-teal-600 font-semibold rounded-sm h-full w-fit py-1.5 px-1.5 hover:bg-teal-100/40 bg-teal-100/20 text-teal-700 transition-all duration-150 font-afacad">
            <MdAdd className="w-5 h-5" />
            Add category
          </Button>
        )
      }
      footerContent={
        <div className={cn("flex gap-2", addProperty.length > 0 && "pr-2")}>
          <Button variant="outline" onClick={handleAddProperty}>
            Add property
          </Button>
          <Button
            variant="outline"
            onClick={handleCreateUpdate}
            className="text-teal-700 hover:text-teal-700 border border-teal-600 bg-teal-100/40 hover:bg-teal-100/60 transition-all duration-150"
          >
            {category ? "Update" : "Create"}
          </Button>
        </div>
      }
    >
      <div
        className={cn(
          "flex flex-col gap-3 h-fit mb-1.5",
          addProperty.length > 0 && "flex-row w-full items-end  pr-2.5"
        )}
      >
        <Input
          required
          type="text"
          id="category"
          label="Category"
          name="category"
          value={categoryName}
          placeholder="Category name"
          onChange={handleChange}
        />
        <CustomSelect
          className="h-full"
          required={false}
          options={categories}
          value={parentCategory}
          label="Parent category"
          onChange={(val: string) => {
            setParentCategory(val === "null" ? "" : val);
          }}
        />
      </div>
      {addProperty.length > 0 && (
        <div
          className="max-h-[45vh] min-w-[50vw] overflow-auto custom-scrollbar pr-2"
          style={{ height: "100%" }}
        >
          {addProperty.map((_, index) => (
            <AddProperties
              key={index}
              index={index}
              currentProperty={
                addedProperties.find((_, idx) => idx === index) ||
                ({} as AddedPropertiesTypes)
              }
              handleRemoveProperty={handleRemoveProperty}
              handlePropertyInputChange={handlePropertyInputChange}
            />
          ))}
        </div>
      )}
    </CustomDialog>
  );
};

export { AddUpdateCategories };
