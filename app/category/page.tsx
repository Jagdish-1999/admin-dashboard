"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "../products/_components/Input";
import { IoCreateOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { createCategory, fetchCategories } from "@/slices/category.slice";
import DataTable from "../products/_components/table/data-table";

export interface CategporyInputType {
  name: string;
}

const initialCategoryInput: CategporyInputType = {
  name: "",
};

const Category = () => {
  const initialState = useRef(false);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.categories);
  const [categoryInput, setCategoryInput] =
    useState<CategporyInputType>(initialCategoryInput);

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
      });
    })();
  }, [categoryInput, dispatch]);

  useEffect(() => {
    if (!data && !initialState.current) {
      dispatch(fetchCategories());
    }
    initialState.current = true;
  }, [dispatch, data]);

  const columns = [
    {
      id: "name",
      header: "Name",
      accessKey: "name",
    },
  ];

  return (
    <div className="">
      <div className="w-full h-fit flex gap-2 items-end p-2 font-dm-sans">
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
        <Button
          onClick={handleCreate}
          className="flex items-center justify-center gap-1 border border-neutral-500/20 font-semibold rounded-sm h-full p-3 w-28 hover:bg-neutral-500/30 bg-neutral-500/20"
        >
          <IoCreateOutline strokeWidth={2} className="w-5 h-5 " />
          Create
        </Button>
      </div>

      {/* <DataTable columns={columns}, data={data} /> */}
    </div>
  );
};

export default Category;
