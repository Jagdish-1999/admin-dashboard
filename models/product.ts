import { Document, Schema, model, models } from "mongoose";

interface Image {
	filename: string;
	contentType: string;
	data: Buffer;
}

export interface ProductDocument extends Document {
	productName: string;
	description: string;
	price: number;
	qty: number;
	images: Image[];
}

const imageSchema = new Schema<Image>({
	filename: {
		type: String,
		required: true,
	},
	contentType: {
		type: String,
		required: true,
	},
	data: {
		type: Buffer,
		required: true,
	},
});

const productSchema = new Schema<ProductDocument>(
	{
		productName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		qty: {
			type: Number,
			required: true,
		},
		images: {
			type: [imageSchema],
			required: false,
		},
	},
	{ timestamps: true }
);

export const Products = model<ProductDocument>("Products", productSchema);
