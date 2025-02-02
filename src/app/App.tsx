"use client";

import React from "react";
import { JotActions } from "./JotActions";
import { MapApp } from "./map";
import { Backdrop } from "../components/Backdrop";
import { BottomDrawer } from "./BottomDrawer";

export type AppProps = {

}

export function App(props: AppProps){
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	return <>
		<MapApp setDrawerOpen={setDrawerOpen} />
		<Backdrop open={drawerOpen} onClick={() => setDrawerOpen(false)} />
		<BottomDrawer open={drawerOpen} />
	</>
}