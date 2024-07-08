import { ProductPropertiesTypes } from "@/app/products/_components/add-update-product";
import { EachCategoryType } from "./category.slice.types";

export interface ProductImagesTypes {
  file?: File;
  url: string;
  id?: string;
}

export interface ProductInputDataProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface EditedProductTypes {
  productName: string;
  description: string;
  images: string[];
  price: number;
  qty: number;
  _id: string;
  id: string;
}
export interface ProductTypes {
  name: string;
  description: string;
  images: ProductImagesTypes[];
  category: EachCategoryType;
  price: number;
  quantity: number;
  properties: ProductPropertiesTypes[];
  _id: string;
  id: string;
}
