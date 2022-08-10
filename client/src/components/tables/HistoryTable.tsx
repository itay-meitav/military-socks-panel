import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import DateIcon from "@mui/icons-material/CalendarMonth";

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return { name, calories, fat, carbs, protein };
}

interface IHistoryTableProps {
	rows: history[];
}

interface history {
	id: number;
	model: string;
	arrival_date: Date;
	departure_date: Date;
	location_id: number;
	sock_id: number;
	lat: number;
	lon: number;
	// base_name: string;
}

export default function HistoryTable(props: IHistoryTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{/* <TableCell>id</TableCell> */}
						<TableCell align="center">id</TableCell>
						<TableCell align="center">Model</TableCell>
						<TableCell align="center">Arrival</TableCell>
						<TableCell align="center">Departure</TableCell>
						<TableCell align="center">Coordinates</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.rows.map((row) => (
						<TableRow
							key={row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell align="center">{row.id}</TableCell>
							<TableCell align="center">{row.model}</TableCell>
							<TableCell align="center">
								{row.arrival_date
									.toISOString()
									.split("T")[0]
									.split("-")
									.reverse()
									.join("/")}
							</TableCell>
							<TableCell align="center">
								{row.departure_date
									.toISOString()
									.split("T")[0]
									.split("-")
									.reverse()
									.join("/")}
							</TableCell>
							<TableCell align="center">
								<Link to={"/locations?id=" + row.location_id}>
									{row.lat + "," + row.lon}
								</Link>
							</TableCell>
							{/* <TableCell align="center">
								<Link to={"/locations?id=" + row.location_id}>
									{row.base_name}
								</Link>
							</TableCell> */}
							<TableCell align="center">
								<Link to={"/socks?id=" + row.sock_id}>View Sock</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
