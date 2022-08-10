import React from "react";
import Card from "./Card";
import SocksTable from "./tables/SocksTable";

const raw = [
	{
		id: 1,
		officer_id: 1,
		location_id: 1,
		model: "this is a model",
		quantity: 332,
		size: 48,
		name: "mikahel",
		base_name: "base",
		lat: -339.23,
		lon: 234.843,
		manufacturing_year: new Date(),
	},
	{
		id: 2,
		officer_id: 2,
		location_id: 2,
		model: "this is a model",
		quantity: 332,
		size: 48,
		name: "mikahel",
		base_name: "base",
		lat: -339.23,
		lon: 234.843,
		manufacturing_year: new Date(),
	},
	{
		id: 3,
		officer_id: 3,
		location_id: 3,
		model: "this is a model",
		quantity: 332,
		size: 48,
		name: "mikahel",
		base_name: "base",
		lat: -339.23,
		lon: 234.843,
		manufacturing_year: new Date(),
	},
];

function SocksPage() {
	return (
		<div id="container">
			<Card subTitle="this is the socks table" title="socks table">
				<SocksTable rows={raw}></SocksTable>
			</Card>
		</div>
	);
}

export default SocksPage;
