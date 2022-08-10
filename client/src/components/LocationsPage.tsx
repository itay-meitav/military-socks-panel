import React from "react";
import Card from "./Card";
import LocationsTable from "./tables/LocationsTable";

const raw = [
	{
		id: 1,
		lat: 122.32,
		lon: -23.212,
		base_name: "base vladimir",
		nearest_city: "vladimir",
	},
	{
		id: 2,
		lat: 122.32,
		lon: -23.212,
		base_name: "base vladimir",
		nearest_city: "vladimir",
	},
	{
		id: 3,
		lat: 122.32,
		lon: -23.212,
		base_name: "base vladimir",
		nearest_city: "vladimir",
	},
];

function LocationsPage() {
	return (
		<div id="container">
			<Card
				title="locations table"
				subTitle="this is a locations table of all the locations"
			>
				<LocationsTable rows={raw}></LocationsTable>
			</Card>
		</div>
	);
}

export default LocationsPage;
