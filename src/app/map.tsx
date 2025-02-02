"use client";

import { AdvancedMarker, APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import React from 'react';
import { useRouter } from 'next/navigation';

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY
const MAP_ID = process.env.NEXT_PUBLIC_MAP_ID

const CACHED_POSITION_KEY = "jotter--cached-position";

export type MapAppProps = {
}

export function MapApp(props: MapAppProps) {
	const {
	} = props;

	const router = useRouter();

	const [userLocation, setUserLocation] = React.useState<google.maps.LatLngLiteral>(undefined);
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

	React.useEffect(() => {
		const watch = navigator.geolocation.watchPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				setUserLocation({ lat: latitude, lng: longitude });
				if(center === undefined){
					setCenter({ lat: latitude, lng: longitude });
				}
			},
			() => {},
			{
				enableHighAccuracy: true,
				timeout: 10000,
			}
		);
		return () => navigator.geolocation.clearWatch(watch);
	}, []);

	React.useEffect(() => {
		if (center) {
			localStorage.setItem(CACHED_POSITION_KEY, JSON.stringify(center));
		}
	}, [center]);

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
				maxZoom={20}
				minZoom={12}
				mapId={MAP_ID}
			>
				{ userLocation &&
					<AdvancedMarker
						clickable
						onClick={() => router.push("/jots")}
						position={userLocation}
						title={'User location'}
						anchorPoint={["50%", "50%"]}
					>
						<div className="w-4 h-4 bg-red-500 rounded-full"></div>
					</AdvancedMarker>
				}
			</Map>
		}
	</APIProvider>
}