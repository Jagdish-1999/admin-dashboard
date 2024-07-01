export interface EachCategoryType {
  _id: string;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleting: boolean;
  isUpdating: boolean;
  isSelected?: boolean;
}

export interface Category {
  data: EachCategoryType[];
  isLoading: boolean;
}

export interface CreateCategoryPayload {
  name: string;
  id?: string;
}
