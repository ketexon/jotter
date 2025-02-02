import mongoose from "mongoose";

export type IUser = {
	username: string;
}

const userSchema = new mongoose.Schema<IUser>({
	username: String,
});

export const User = mongoose.model("User", userSchema);
