import { ProductPropertiesTypes } from "@/app/products/_components/add-update-product";
import { ProductImagesTypes } from ".";

export interface UpdateProductTypes {
  name: "";
  description: "";
  price: number;
  quantity: number;
}

export interface CreateUpdateProductTypes {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  properties: ProductPropertiesTypes[];
  images: ProductImagesTypes[];
}

export interface ProductsItemTypes {
  _id: string;
  id: string;
  quantity: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
  isDeleting: boolean;
  isSelected?: boolean;
}

export interface ProductsTypes {
  data: ProductsItemTypes[];
  isLoading: boolean;
}
