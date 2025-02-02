'use server';

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connect(uri: string = MONGODB_URI) {
	if(mongoose.connection.readyState !== 1) {
		await mongoose.connect(
			uri,
			{
				dbName: "jotter",
			}
		)
	}
}