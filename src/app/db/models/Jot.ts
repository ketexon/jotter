import mongoose from "mongoose";

const jotSchema = new mongoose.Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	lat: Number,
	lng: Number,
	text: String,
	created: Date,
	updated: Date,
	media: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Media",
	},
});

export const Jot = mongoose.model("Jot", jotSchema)