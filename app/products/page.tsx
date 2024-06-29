"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import DataTable from "./_components/table/data-table";
import { GetColumns } from "./_components/table/colums";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { RootState, useAppSelector, useAppDispatch } from "@/stores/store";
import { deleteProductWithIds, fetchProducts } from "@/slices/products.slice";
import { ProductsItemTypes } from "@/types/products.slice.types";
import { cn } from "@/lib/utils";
import CustomAlertDialog from "@/common/alert-dialog";
import { ImSpinner8 } from "react-icons/im";

export interface ProductListProps {
  _id: string;
  productName: string;
  description: string;
  price: string;
}

const Products = () => {
  const initialRef = useRef(false);
  const dispatch = useAppDispatch();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isDeletingProducts, setIsDeletingProducts] = useState<boolean>(false);

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

  const onSelect = useCallback(
    (products: ProductsItemTypes[], chech: boolean, selectAll?: boolean) => {
      setSelectedProducts((prevProducts) => {
        if (prevProducts.includes(products[0]._id)) {
          return prevProducts.filter((i) => i !== products[0]._id);
        }
        return [...prevProducts, products[0]._id];
      });
      if (selectAll) {
        setSelectedProducts(!chech ? [] : products.map((i) => i._id));
      }
    },
    []
  );

  const deleteProducts = useCallback(() => {
    setIsDeletingProducts(true);
    dispatch(deleteProductWithIds(selectedProducts))
      .then(() => {
        setSelectedProducts([]);
      })
      .finally(() => {
        setIsDeletingProducts(false);
      });
  }, [dispatch, selectedProducts]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-between items-center mb-1">
        {/* //TODO  need to add search and filters in product list*/}
        <div className="underline italic"></div>
        <div className="flex gap-2">
          <CustomAlertDialog
            dialogTitle={
              <div className="text-slate-900/90 font-semibold">
                Are you absolutely sure?
              </div>
            }
            onContinue={deleteProducts}
            triggerChildren={
              <div
                // onClick={deleteProducts}
                className={cn(
                  "w-fit h-full border opacity-100 text-sm text-red-700 border-red-500/25 hover:bg-red-500/20 bg-red-500/10 rounded-sm transition-all duration-150 ease-linear cursor-pointer",
                  selectedProducts.length == 0 &&
                    "opacity-0 pointer-events-none select-none"
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
                  <div className="flex items-center justify-center w-full h-full">
                    <MdDeleteForever
                      className={cn(
                        "min-w-8 min-h-8 w-8 h-8 text-red-700 transition-all duration-150 ease-in p-2 font-semibold opacity-100"
                      )}
                    />
                    <div className="flex pr-2">Delete</div>
                  </div>
                )}
              </div>
            }
          >
            <span className="text-slate-900/70 font-dm-sans">
              This action cannot be undone. This will permanently delete your
              product and remove your data from our servers.
            </span>
          </CustomAlertDialog>
          <Link href="/products/new">
            <div className="flex gap-1 items-center bg-neutral-500/10 hover:bg-neutral-500/20 border border-neutral-500/20 rounded-sm p-2 w-fit hover:border-neutral-500/20 transition-all duration-150 text-sm hover:text-slate-900/90 text-slate-900/80">
              <MdAdd className="w-5 h-5" />
              Add product
            </div>
          </Link>
        </div>
      </div>
      <DataTable
        isDeletingProducts={isDeletingProducts}
        selectedProducts={selectedProducts}
        onSelect={onSelect}
        columns={GetColumns()}
        data={productList}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Products;
