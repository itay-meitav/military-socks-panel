import React from "react";
import Card from "./Card";
import OfficersTable from "./tables/OfficersTable";

const raw = [
	{
		id: 1,
		name: "rom",
		army_id_number: "123456",
		email: "rom@idf.gov",
		phone: "+4343-34-334",
	},
	{
		id: 2,
		name: "rom",
		army_id_number: "123456",
		email: "rom@idf.gov",
		phone: "+4343-34-334",
	},
	{
		id: 3,
		name: "rom",
		army_id_number: "123456",
		email: "rom@idf.gov",
		phone: "+4343-34-334",
	},
];

function OfficersPage() {
	return (
		<div>
			<Card
				title="officers table"
				subTitle="this table shows a list of all officers on the russian army"
			>
				<OfficersTable rows={raw}></OfficersTable>
			</Card>
		</div>
	);
}

export default OfficersPage;
