"use client";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import DataTable from "./_components/table/data-table";
import { GetColumns } from "./_components/table/colums";
import { MdAdd } from "react-icons/md";
import { fetchProductList } from "@/slices/product-list.slice";
import { RootState, useAppSelector, useAppDispatch } from "@/stores/store";
import { ProductListItemTypes } from "@/types/product-list.slice.types";

export interface ProductListProps {
  _id: string;
  productName: string;
  description: string;
  price: string;
}

const Products = () => {
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector(
    (state: RootState) => state.productList
  );
  const [productList, setProductList] = useState<ProductListItemTypes[]>([]);

  useEffect(() => {
    if (initialRef.current) {
      dispatch(fetchProductList());
      initialRef.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    setProductList(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-between items-center mb-1">
        {/* TODO  need to add search and filters in product list*/}
        <div className="underline italic"></div>
        <Link href="/products/new" className="">
          <div className="flex gap-2 items-center bg-neutral-500/10 hover:bg-neutral-500/20 border border-neutral-500/20 rounded-sm p-2 w-fit hover:border-neutral-500/20 transition-all duration-150 text-[14px] hover:text-slate-900/90 text-slate-900/80">
            <MdAdd className="w-5 h-5" />
            Add product
          </div>
        </Link>
      </div>
      <div className="overflow-hidden h-full rounded-sm rounded-ee-[3px] border border-neutral-500/50">
        <DataTable
          columns={GetColumns()}
          data={productList}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Products;
