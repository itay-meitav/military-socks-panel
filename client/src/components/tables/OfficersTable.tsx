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

interface IOfficersTableProps {
	rows: Officer[];
}

interface Officer {
	id: number;
	name: string;
	army_id_number: string;
	email: string;
	phone: string;
}

export default function OfficersTable(props: IOfficersTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{/* <TableCell>id</TableCell> */}
						<TableCell align="center">id</TableCell>
						<TableCell align="center">Name</TableCell>
						<TableCell align="center">Army Id Number</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Phone</TableCell>
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
							<TableCell align="center">{row.name}</TableCell>
							<TableCell align="center">{row.army_id_number}</TableCell>
							<TableCell align="center">{row.email}</TableCell>
							<TableCell align="center">{row.phone}</TableCell>
							<TableCell align="center">
								<Link to={"/socks?officer_id=" + row.id}>
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
