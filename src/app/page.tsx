import React from "react";
import { MapApp } from "./map";
import { connect } from "./db";

export default async function Page() {
	await connect();

	return <div>
		<MapApp />
	</div>
}