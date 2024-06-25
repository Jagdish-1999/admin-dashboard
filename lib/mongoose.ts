import mongoose from "mongoose";

export async function connectToDatabase() {
	if (!process.env.MONGODB_URI) return;
	if (mongoose.connection.readyState === 1) {
		return mongoose.connection.asPromise();
	} else {
		const url = process.env.MONGODB_URI!;
		mongoose.connect(url);
	}
}
