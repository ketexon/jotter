import { Schema, Types, model } from "mongoose";

export type IJot = {
	creator: Types.ObjectId,
	lat: number,
	lng: number,
	text: string,
	created: Date,
	updated: Date,
	media: Types.ObjectId,
};

const jotSchema = new Schema<IJot>({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	lat: Number,
	lng: Number,
	text: String,
	created: {
		type: Date,
		default: Date.now,
	},
	media: {
		type: Schema.Types.ObjectId,
		ref: "Media",
	},
});

export const Jot = model("Jot", jotSchema)