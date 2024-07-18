import { TableColumnTypes } from "@/types/table.types";
import { OrderItems, OrderTypes } from "../page";
import { CreatedUpdatedAt } from "@/app/_components/common/created-updated";
import { formatDate } from "@/lib/format-date";

const columns = [
  // ORDER ID
  {
    id: "_id",
    accessKey: "_id",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[20%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: () => "Order Id",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  // Payment isPaid ?
  {
    id: "isPaid",
    accessKey: "isPaid",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[15%] min-w-[50px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: () => "Payment",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey] ? (
        <p className="bg-teal-200 px-4 py-1 rounded-full text-teal-700 text-xs">
          YES
        </p>
      ) : (
        <p className="bg-red-200 px-4 py-1 rounded-full text-red-600 text-xs">
          NO
        </p>
      );
    },
  },
  // USER NAME
  {
    id: "user name",
    accessKey: "name",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none h-fit pr-12",
    className:
      "w-[40%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: () => "Reciepent Name",
    bodyCellLabel: function ({ item }) {
      return (
        <div className="py-4">
          <div className="">Name - {`${item[this.accessKey]}`}</div>
          <div className="flex gap-1">
            <div className="">Mob - {`${item["contact"]}`} </div>
            <div className="text-[11px]">{`${item["alternateNumber"]}`}</div>
          </div>
          <div className="">Address - {`${item["streetAddress"]}`}</div>
          <div className="">Postal code - {`${item["postalCode"]}`}</div>
          <div className="">City - {`${item["city"]}`}</div>
          <div className="">State - {`${item["state"]}`}</div>
          <div className="">Country - {`${item["country"]}`}</div>
        </div>
      );
    },
  },
  // QUANTITY
  {
    id: "qty",
    accessKey: "quantity",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[10%] min-w-[40px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: () => "Orders Qty",
    bodyCellLabel: function ({ item }) {
      return item["orderItems"].reduce((acc, curr) => {
        return (acc += Number(curr.quantity));
      }, 0);
    },
  },
  // CREATED AT
  {
    id: "createdAt",
    accessKey: "createdAt",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none pr-4",
    className:
      "w-[10%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: () => "Created At",
    bodyCellLabel: function ({ item }) {
      const createdAt = formatDate(item.createdAt);
      return (
        <CreatedUpdatedAt
          item={{ ...item, createdAt }}
          accessKey={this.accessKey}
        />
      );
    },
  },
  // UPDATED AT
  {
    id: "updatedAt",
    accessKey: "updatedAt",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[10%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75",
    headCellLabel: () => "Updated At",
    bodyCellLabel: function ({ item }) {
      const updatedAt = formatDate(item.updatedAt);
      return (
        <CreatedUpdatedAt
          item={{ ...item, updatedAt }}
          accessKey={this.accessKey}
        />
      );
    },
  },
] as TableColumnTypes<OrderTypes>[];

const subColumns = [
  // PRODUCT ID
  {
    id: "_id",
    accessKey: "_id",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[30%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    headCellLabel: () => "Product Id",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  // PRODUCT NAME
  {
    id: "product name",
    accessKey: "name",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default h-fit pr-12 select-none",
    className:
      "w-[40%] min-w-[80px] flex items-center justify-center text-[13px] text-slate-900/75 py-4 cursor-default",
    headCellLabel: () => "Product Name",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  // QUANTITY
  {
    id: "quantity",
    accessKey: "quantity",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[15%] min-w-[40px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    headCellLabel: () => "Quantity",
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
  },
  // UNIT PRICE
  {
    id: "unit price",
    accessKey: "unitPrice",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[15%] min-w-[40px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    headCellLabel: () => "Unit Price",
    bodyCellLabel: function ({ item }) {
      return <> &#x20B9;{`${item["price" as keyof {}][this.accessKey]}`}</>;
    },
  },
  // TOTAL PRICE
  {
    id: "total price",
    accessKey: "totalPrice",
    headClasses:
      "py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none",
    className:
      "w-[15%] min-w-[40px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default",
    headCellLabel: () => "Total Price",
    bodyCellLabel: function ({ item }) {
      return <> &#x20B9;{`${item["price" as keyof {}][this.accessKey]}`}</>;
    },
  },
] as TableColumnTypes<OrderItems>[];

export { columns, subColumns };
