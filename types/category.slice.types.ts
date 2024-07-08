export interface PropertiesTypes {
  name: string;
  values: string[];
}
export interface ParentCategoryType {
  createdAt: string;
  updatedAt: string;
  name: string;
  properties: PropertiesTypes[];
  _id: string;
}
export interface EachCategoryType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleting: boolean;
  isUpdating: boolean;
  isSelected?: boolean;
  parent: ParentCategoryType;
  properties: PropertiesTypes[];
}

export interface CategoryType {}

export interface Category {
  data: EachCategoryType[];
  isLoading: boolean;
}

export interface CreateCategoryPayload {
  name: string;
  parent?: string | null;
  properties?: PropertiesTypes[];
  _id?: string;
}
