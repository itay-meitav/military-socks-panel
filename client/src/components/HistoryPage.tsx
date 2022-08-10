import React from "react";
import Card from "./Card";
import HistoryTable from "./tables/HistoryTable";

const raw = [
	{
		arrival_date: new Date(),
		departure_date: new Date(),
		id: 1,
		lat: 11.34,
		location_id: 1,
		lon: -123.844,
		model: "this is the model",
		sock_id: 1,
	},
	{
		arrival_date: new Date(),
		departure_date: new Date(),
		id: 2,
		lat: 11.34,
		location_id: 2,
		lon: -223.844,
		model: "this is the model",
		sock_id: 2,
	},
	{
		arrival_date: new Date(),
		departure_date: new Date(),
		id: 3,
		lat: 11.34,
		location_id: 3,
		lon: -323.844,
		model: "this is the model",
		sock_id: 3,
	},
];
function HistoryPage() {
	return (
		<div id="container">
			<Card
				title="locations history table"
				subTitle="table to view sock location history"
			>
				<HistoryTable rows={raw}></HistoryTable>
			</Card>
		</div>
	);
}

export default HistoryPage;
