export interface ProductImagesTypes {
	file?: File;
	url: string;
	id?: string;
}

interface EachInputNumberType {
	value: number | null;
	error: boolean;
}

interface EachInputStringType {
	value: "";
	error: boolean;
}

export const PRODUCT_NAME = "productName";
export const DESCRIPTION = "description";
export const PRICE = "price";
export const QUANTITY = "qty";
export const PRODUCT_IMAGES = "productImages";

export interface ProductInputDataProps {
	[PRODUCT_NAME]: EachInputStringType;
	[DESCRIPTION]: EachInputStringType;
	[PRICE]: EachInputNumberType;
	[QUANTITY]: EachInputNumberType;
}

export interface EditedProductTypes {
	productName: string;
	description: string;
	images: string[];
	price: number;
	qty: number;
	_id: string;
}
