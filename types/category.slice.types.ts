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
}

export interface Category {
  data: EachCategoryType[];
  isLoading: boolean;
}

export interface CreateCategoryPayload {
  name: string;
  parent?: string | null;
  properties?: { [key: string]: string[] };
  id?: string;
}
