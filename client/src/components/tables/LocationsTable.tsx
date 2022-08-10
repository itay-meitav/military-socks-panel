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

interface ISocksTableProps {
	rows: SockRow[];
}

interface SockRow {
	id: number;
	lat: number;
	lon: number;
	base_name: string;
	nearest_city: string;
}

export default function LocationsTable(props: ISocksTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{/* <TableCell>id</TableCell> */}
						<TableCell align="center">id</TableCell>
						<TableCell align="center">Base name</TableCell>
						<TableCell align="center">Nearest city</TableCell>
						<TableCell align="center">Latitude</TableCell>
						<TableCell align="center">Longitude</TableCell>
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
							<TableCell align="center">{row.base_name}</TableCell>
							<TableCell align="center">{row.nearest_city}</TableCell>
							<TableCell align="center">{row.lat}</TableCell>
							<TableCell align="center">{row.lon}</TableCell>
							<TableCell align="center">
								<Link to={"/socks?location_id=" + row.id}>
									View Socks
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
