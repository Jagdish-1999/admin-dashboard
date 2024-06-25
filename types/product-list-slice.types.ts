export interface UpdateProductTypes {
	productName: "";
	description: "";
	price: number | null;
	qty: number | null;
}

export interface CreateProductTypes {
	productName: string;
	description: string;
	price: string;
}

export interface ProductListItemTypes {
	_id: string;
	qty: number;
	productName: string;
	description: string;
	price: number;
	createdAt: string;
	updatedAt: string;
	images: string[];
}

export interface ProductListTypes {
	data: ProductListItemTypes[];
	isLoading: boolean;
}
