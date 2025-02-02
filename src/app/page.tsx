import React from "react";
import { connect } from "./db";
import { App } from "./App";

export default async function Page() {
	await connect();

	return <App/>
}