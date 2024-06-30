import { EachColumnType } from "@/app/products/_components/table/colums";
import { EachCategoryType } from "@/types/category.slice.types";
import { TableColumnTypes } from "@/types/table.types";

export const COLUMNS = [
  {
    id: "name",
    accessKey: "name",
    headCellLabel: function () {
      return "Category name";
    },
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
    // classes:
    //   "flex items-center text-neutral-900/70 flex-grow text-sm indent-2 capitalize",
    // headerClasses:
    //   "flex items-center text-neutral-900/70 flex-grow text-sm indent-2",
  },
  {
    id: "createdAt",
    accessKey: "createdAt",
    headCellLabel: function () {
      return "Created At";
    },
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
    // classes: "w-[33%] flex items-center justify-center text-neutral-900/70",
    // headerClasses:
    //   "w-[33%] flex items-center justify-center text-neutral-900/70 text-sm",
  },
  {
    id: "updatedAt",
    accessKey: "updatedAt",
    headCellLabel: function () {
      return "Updated At";
    },
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
    // classes: "w-[33%] flex items-center justify-center text-neutral-900/70",
    // headerClasses:
    //   "w-[33%] flex items-center justify-center text-neutral-900/70 text-sm",
  },
  {
    id: "edit",
    accessKey: "edit",
    headCellLabel: function () {
      return "Edit";
    },
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
    // classes:
    //   "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[12px]",
    // headerClasses:
    //   "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[14px] font-semibold",
  },
  {
    id: "delete",
    accessKey: "delete",
    headCellLabel: function () {
      return "Delete";
    },
    bodyCellLabel: function ({ item }) {
      return item[this.accessKey];
    },
    // classes: "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center",
    // headerClasses:
    //   "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center mr-1",
  },
] as TableColumnTypes<EachCategoryType>[];
