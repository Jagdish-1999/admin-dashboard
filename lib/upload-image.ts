// lib/multer.ts
import multer from "multer";
import { NextRequest, NextResponse } from "next/server";

// const storage = multer.memoryStorage();

// const upload = multer({
// 	storage,
// 	limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
// });

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log("req", req);
		console.log("file", file);
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

const upload = multer({ storage });
// const upload = multer({ dest: "uploads/" });
// export const multerUpload = upload.single("images"); // Accept up to 10 files
export const multerUpload = upload.array("images", 10); // Accept up to 10 files

export const runMiddleware = async (
	req: NextRequest,
	res: NextResponse,
	fn: Function
) => {
	return new Promise((resolve, reject) => {
		fn(req, res, async (result: any) => {
			// console.log("req", req);
			console.log("files", req.files);
			console.log("Result", result);
			// console.log("buffer", await req.arrayBuffer());
			// console.log("formData", (await req.formData()).getAll("images"));
			if (result instanceof Error) {
				return reject(result);
			}
			return resolve(result);
		});
	});
};
