import { AddedPropertiesTypes } from "@/app/categories/_components/add-update-category";

export interface ParentCategoryType {
  createdAt: string;
  updatedAt: string;
  name: string;
  _id: string;
}
export interface EachCategoryType {
  _id: string;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleting: boolean;
  isUpdating: boolean;
  isSelected?: boolean;
  parent: ParentCategoryType;
  properties: { propertyName: string; propertyValue: string }[];
}

export interface Category {
  data: EachCategoryType[];
  isLoading: boolean;
}

export interface CreateCategoryPayload {
  name: string;
  parent?: string | null;
  properties?: AddedPropertiesTypes[];
  id?: string;
}
