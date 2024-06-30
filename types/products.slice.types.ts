import { ProductImagesTypes } from ".";

export interface UpdateProductTypes {
  productName: "";
  description: "";
  price: number | null;
  qty: number | null;
}

export interface CreateUpdateProductTypes {
  productName: string;
  description: string;
  price: number | null;
  qty: number | null;
  images: ProductImagesTypes[];
}

export interface ProductsItemTypes {
  _id: string;
  id: string;
  qty: number;
  productName: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
  isDeleting: boolean;
}

export interface ProductsTypes {
  data: ProductsItemTypes[];
  isLoading: boolean;
}
