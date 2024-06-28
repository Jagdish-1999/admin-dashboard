"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import DataTable from "./_components/table/data-table";
import { GetColumns } from "./_components/table/colums";
import { MdAdd } from "react-icons/md";
import { RootState, useAppSelector, useAppDispatch } from "@/stores/store";
import { fetchProducts } from "@/slices/products.slice";

export interface ProductListProps {
  _id: string;
  productName: string;
  description: string;
  price: string;
}

const Products = () => {
  const initialRef = useRef(false);
  const dispatch = useAppDispatch();
  const { data: productList, isLoading } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (productList.length === 0 && !initialRef.current) {
      console.log("Fetched Product ?");
      dispatch(fetchProducts());
      initialRef.current = true;
    }
  }, [dispatch, productList, productList.length]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-between items-center mb-1">
        {/* //TODO  need to add search and filters in product list*/}
        <div className="underline italic"></div>
        <Link href="/products/new" className="">
          <div className="flex gap-1 items-center bg-neutral-500/10 hover:bg-neutral-500/20 border border-neutral-500/20 rounded-sm p-2 w-fit hover:border-neutral-500/20 transition-all duration-150 text-[14px] hover:text-slate-900/90 text-slate-900/80">
            <MdAdd className="w-5 h-5" />
            Add product
          </div>
        </Link>
      </div>
      <DataTable
        columns={GetColumns()}
        data={productList}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Products;
