import { NextRequest } from "next/server";

declare module "next/server" {
	interface NextRequest {
		files?: Express.Multer.File[];
	}
}
