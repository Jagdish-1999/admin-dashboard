import { EachColumnType } from "@/app/products/_components/table/colums";
import { EachCategoryType } from "@/types/category.slice.types";

export const COLUMNS = [
  {
    id: "name",
    header: "Category name ",
    accessKey: "name",
    classes:
      "flex items-center text-neutral-900/70 flex-grow text-sm indent-2 capitalize",
    headerClasses:
      "flex items-center text-neutral-900/70 flex-grow text-sm indent-2",
  },
  {
    id: "createdAt",
    header: "Created At",
    accessKey: "createdAt",
    classes: "w-[33%] flex items-center justify-center text-neutral-900/70",
    headerClasses:
      "w-[33%] flex items-center justify-center text-neutral-900/70 text-sm",
  },
  {
    id: "updatedAt",
    header: "Updated At",
    accessKey: "updatedAt",
    classes: "w-[33%] flex items-center justify-center text-neutral-900/70",
    headerClasses:
      "w-[33%] flex items-center justify-center text-neutral-900/70 text-sm",
  },
  {
    id: "edit",
    header: "",
    accessKey: "edit",
    headerIcon: "",
    classes:
      "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[12px]",
    headerClasses:
      "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center text-[14px] font-semibold",
  },
  {
    id: "delete",
    header: "",
    accessKey: "delete",
    classes: "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center",
    headerClasses:
      "min-w-8 min-h-8 w-[5%] px-2 flex items-center justify-center mr-1",
  },
] as EachColumnType<EachCategoryType>[];
