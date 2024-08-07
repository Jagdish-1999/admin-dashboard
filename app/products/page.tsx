"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ImSpinner8 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";

import { RootState, useAppSelector, useAppDispatch } from "@/stores/store";
import { deleteProductWithIds, fetchProducts } from "@/slices/products.slice";
import { ProductsItemTypes } from "@/types/products.slice.types";
import CustomAlertDialog from "@/app/_components/common/alert/custom-alert-dialog";
import { Table } from "@/app/_components/common/table/table";
import { ContextType } from "@/lib/column-cell-label-wrapper";
import SuppressHydration from "@/lib/suppresh-hydration";
import { COLUMNS } from "./_components/columns";
import { AddUpdateProduct } from "./_components/add-update-product";

const Products = () => {
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isDeletingProducts, setIsDeletingProducts] = useState<boolean>(false);

  const { data: productList, isLoading } = useAppSelector(
    (state: RootState) => state.products
  );

  const onSelect = useCallback(
    (
      products: ProductsItemTypes[],
      isCheched: boolean,
      selectAll?: boolean
    ) => {
      setSelectedProducts((prevProducts) => {
        if (prevProducts.includes(products[0].id)) {
          return prevProducts.filter((i) => i !== products[0].id);
        }
        return [...prevProducts, products[0].id];
      });
      if (selectAll) {
        setSelectedProducts(
          !isCheched
            ? products.filter((p) => p.isDeleting).map((i) => i.id)
            : products.map((i) => i.id)
        );
      }
    },
    []
  );

  const deleteProducts = useCallback(async () => {
    setIsDeletingProducts(true);
    try {
      await dispatch(deleteProductWithIds(selectedProducts));
      setSelectedProducts([]);
    } catch (error) {
      console.error("Failed to delete products:", error);
    } finally {
      setIsDeletingProducts(false);
    }
  }, [dispatch, selectedProducts]);

  const onCellLabelClick = useCallback(
    (context: ContextType<ProductsItemTypes>) => {
      switch (context.id) {
        case "checkbox": {
          if (!context.item) {
            onSelect(
              productList,
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
            (async () => {
              const res = await dispatch(
                deleteProductWithIds([context.item._id])
              );
              if (res.meta.requestStatus === "fulfilled") {
                setSelectedProducts((prevIds) =>
                  prevIds.filter((sid) => sid !== context.item._id)
                );
              }
            })();
          } catch (error) {}
          break;
        }
        default: {
          console.log(`[Cell Clicked] ${context.id}`);
        }
      }
    },
    [dispatch, onSelect, productList]
  );

  useEffect(() => {
    if (productList.length === 0 && initialRef.current) {
      try {
        dispatch(fetchProducts());
      } catch (error) {}
      initialRef.current = false;
    }
  }, [dispatch, productList, productList.length]);

  const data = useMemo(
    () =>
      productList.map((p) => {
        if (selectedProducts.includes(p.id)) {
          return { ...p, isSelected: true };
        }
        return { ...p, isSelected: false };
      }),
    [productList, selectedProducts]
  );

  return (
    <SuppressHydration>
      <div className="flex flex-col gap-3 p-2 pt-0 w-full h-full">
        <div className="flex justify-between items-center">
          {/* //TODO  need to add search and filters in product list*/}
          <div className="underline italic text-neutral-100">Todo</div>
          <div className="flex w-fit h-full gap-2 items-center">
            <div
              className={cn(
                "w-fit h-full flex transition-all duration-150 ease-linear cursor-pointer",
                !selectedProducts.length &&
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
                onContinue={deleteProducts}
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
                          "flex items-center justify-center w-full h-full  transition-all duration-150 ease-in "
                        )}
                      >
                        <MdDeleteForever
                          className={cn(
                            "min-w-8 min-h-8 w-8 h-8 text-red-700 p-2 font-semibold opacity-100"
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
            <AddUpdateProduct />
          </div>
        </div>
        <Table<ProductsItemTypes>
          noDataText="No product exists"
          data={data}
          isLoading={isLoading}
          columns={COLUMNS}
          warnRows={selectedProducts}
          onCellLabelClick={onCellLabelClick}
        />
      </div>
    </SuppressHydration>
  );
};

export default Products;
