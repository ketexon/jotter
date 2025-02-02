'use server';

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connect() {
	await mongoose.connect(MONGODB_URI);
}