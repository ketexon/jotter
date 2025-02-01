"use client";

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react';

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY
const MAP_ID = process.env.NEXT_PUBLIC_MAP_ID

const CACHED_POSITION_KEY = "jotter--cached-position";

export function MapApp() {
	const [center, setCenter] = React.useState<google.maps.LatLngLiteral>(undefined);

	React.useEffect(() => {
		const cachedPosition = localStorage.getItem(CACHED_POSITION_KEY);

		if (cachedPosition) {
			const position = JSON.parse(cachedPosition);
			// validate position
			if(position.lat && position.lng) {
				setCenter(oldPosition => (
					// don't overwrite old position if it's been set otherwise
					oldPosition === undefined
						? position
						: oldPosition
				));
			}
		}
	}, [])

	console.log(MAP_ID);

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				setCenter({ lat: latitude, lng: longitude });
			},
			(error) => {
				console.error(error);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
			}
		);
	}, []);

	React.useEffect(() => {
		if (center) {
			localStorage.setItem(CACHED_POSITION_KEY, JSON.stringify(center));
		}
	}, [center]);

	console.log(center)

	return <APIProvider apiKey={API_KEY}>
		{center &&
			<Map
				className="w-screen h-screen"
				defaultCenter={center}
				center={center}
				onCenterChanged={(v) => setCenter(v.detail.center)}
				defaultZoom={18}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
				maxZoom={18}
				minZoom={10}
				mapId={MAP_ID}
			/>
		}
	</APIProvider>
}