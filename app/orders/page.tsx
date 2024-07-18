"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "../_components/common/table/table";
import { columns, subColumns } from "./_components/columns";
import axios from "axios";
import { CustomDialog } from "../_components/common/dialog/custom-dialog";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { fetchOrders } from "@/slices/order.slice";

export interface OrderItems {
  _id: string;
  price: {
    currency: string;
    unitPrice: string;
    totalPrice: string;
  };
  quantity: string;
  name: string;
}
export interface OrderTypes {
  _id: string;
  orderItems: OrderItems[];
  name: string;
  email: string;
  contact: string;
  alternateNumber: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  state: string;
  country: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

const Orders = () => {
  const initialRef = useRef(true);
  const dispatch = useAppDispatch();
  const [selectedOrder, setSelectedOrder] = useState<OrderTypes>();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (!data.length && initialRef.current) {
      dispatch(fetchOrders());
      initialRef.current = false;
    }
  }, [data.length, dispatch]);

  const onRowClick = useCallback((items: OrderTypes) => {
    setSelectedOrder(items);
    setShowModal(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2 h-full w-full">
      <Table<OrderTypes>
        noDataText="No Order exists"
        data={data}
        isLoading={isLoading}
        columns={columns}
        onRowClick={onRowClick}
      />
      <CustomDialog
        className="h-[38rem]  w-[58rem]"
        open={showModal}
        onOpenChange={(oopen) => {
          setShowModal(oopen);
        }}
        titleClasses="text-center text-neutral-500 h-fit -mt-2"
        descriptionClasses="hidden"
        title={"Order Items"}
        triggerChildren=""
      >
        <div className="w-full h-[33rem] -mb-8">
          <Table<OrderItems>
            data={selectedOrder?.orderItems || []}
            isLoading={isLoading}
            columns={subColumns}
          />
        </div>
      </CustomDialog>
    </div>
  );
};

export default Orders;
