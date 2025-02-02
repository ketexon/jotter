import React from "react";

import "./globals.css";
import { MapApp } from "./Map";
import { BottomDrawer } from "./BottomDrawer";
import Cutscene from "./Cutscene";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<main>
					<Cutscene />
					<MapApp />
					<BottomDrawer>{children}</BottomDrawer>
				</main>
			</body>
		</html>
	);
}
