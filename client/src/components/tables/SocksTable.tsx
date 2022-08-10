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
	officer_id: number;
	location_id: number;
	model: string;
	quantity: number;
	size: number;
	manufacturing_year: Date;
	lat: number;
	lon: number;
	base_name: string;
	name: string;
}

export default function SocksTable(props: ISocksTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{/* <TableCell>id</TableCell> */}
						<TableCell align="center">id</TableCell>
						<TableCell align="center">Model</TableCell>
						<TableCell align="center">Quantity</TableCell>
						<TableCell align="center">Size</TableCell>
						<TableCell align="center">Manufacture year</TableCell>
						<TableCell align="center">Coordinates</TableCell>
						<TableCell align="center">Base name</TableCell>
						<TableCell align="center">Officer name</TableCell>
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
							<TableCell align="center">{row.quantity}</TableCell>
							<TableCell align="center">{row.size}</TableCell>
							<TableCell align="center">
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignContent: "center",
										gap: "5px",
									}}
								>
									<DateIcon></DateIcon>
									<span
										style={{
											lineHeight: 2,
										}}
									>
										{
											row.manufacturing_year
												.toISOString()
												.split("-")[0]
										}
									</span>
								</div>
							</TableCell>
							<TableCell align="center">
								<Link to={"/locations?id=" + row.location_id}>
									{row.lat + "," + row.lon}
								</Link>
							</TableCell>
							<TableCell align="center">
								<Link to={"/locations?id=" + row.location_id}>
									{row.base_name}
								</Link>
							</TableCell>
							<TableCell align="center">
								<Link to={"/officers?id=" + row.officer_id}>
									{row.name}
								</Link>
							</TableCell>
							<TableCell align="center">
								<Link to={"/history?sock_id=" + row.id}>
									View History
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
