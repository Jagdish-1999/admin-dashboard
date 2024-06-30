"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Input from "../products/_components/Input";
import { IoCreateOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { createCategory, fetchCategories } from "@/slices/category.slice";
import CustomAlertDialog from "@/common/alert-dialog";
import SuppressHydration from "@/lib/suppresh-hydration";
import { COLUMNS } from "./_components/columns";
import { Table } from "@/common/table";
import { EachCategoryType } from "@/types/category.slice.types";

export interface CategporyInputType {
  name: string;
}

const initialCategoryInput: CategporyInputType = {
  name: "",
};

const Category = () => {
  const initialState = useRef(false);
  const dispatch = useAppDispatch();
  const [categoryInput, setCategoryInput] =
    useState<CategporyInputType>(initialCategoryInput);
  const { data, isLoading } = useAppSelector((state) => state.categories);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryInput({ name: evt.target.value });
    },
    []
  );

  const handleCreate = useCallback(() => {
    (async () => {
      const payload = categoryInput;
      dispatch(createCategory(payload)).then(() => {
        setCategoryInput(initialCategoryInput);
        return true;
      });
    })();
  }, [categoryInput, dispatch]);

  useEffect(() => {
    if (!data && !initialState.current) {
      dispatch(fetchCategories());
    }
    initialState.current = true;
  }, [dispatch, data]);

  return (
    <SuppressHydration>
      <div className="flex flex-col gap-2 w-full h-full p-2 pt-0">
        <div className="w-full h-fit flex gap-2 items-end  font-dm-sans">
          <div className="flex flex-grow"></div>
          <CustomAlertDialog
            continueButtonText={() => (
              <div className="flex gap-1 items-center justify-center text-neutral-900/80 hover:text-slaate-900/80 w-full h-full p-2 text-sm rounded-sm border border-neutral-500/50 bg-neutral-500/10 hover:bg-neutral-500/15 transition-all duration-150">
                <IoCreateOutline strokeWidth={2} className="w-4 h-4 " />
                Create
              </div>
            )}
            dialogTitle="Create new category"
            onContinue={handleCreate}
            triggerChildren={
              <div className="flex items-center justify-center gap-1 p-2 text-sm border border-neutral-500/20 font-semibold rounded-sm h-full w-28 hover:bg-neutral-500/20 bg-neutral-500/15 text-neutral-900/70 hover:text-neutral-900/80 transition-all duration-150">
                <IoCreateOutline strokeWidth={2} className="w-5 h-5 " />
                Create
              </div>
            }
          >
            <Input
              required
              type="text"
              id="category"
              label="Category"
              name="category"
              error={!categoryInput.name}
              value={categoryInput.name}
              placeholder="Category name"
              onChange={handleChange}
            />
          </CustomAlertDialog>
        </div>

        <div className="w-full h-full relative">
          <Table<EachCategoryType>
            data={data || []}
            columns={COLUMNS}
            isLoading={isLoading}
          />
        </div>
      </div>
    </SuppressHydration>
  );
};

export default Category;
