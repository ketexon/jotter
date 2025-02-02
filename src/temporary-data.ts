import dotenv from "dotenv";
import { connect } from "./app/db";
import { Jot } from "./app/db/models/Jot";
import { IUser, User } from "./app/db/models/User";
import mongoose from "mongoose";


async function main(){
	dotenv.config();
	await connect(process.env.MONGODB_URI);

	let user: IUser;
	if(User.exists({ username: "test" })) {
		user = await User.create({ username: "test" });
	}
	else {
		user = await User.findOne({ username: "test" })
			.exec();
	}

	console.log(user);

	await Jot.create({

	})

	mongoose.disconnect();
}

main();