import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Popup from "../mini/Popup";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import config from "../../assets/config";

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
	rows: ISock[];
	deleteItemById: Function;
}

export interface ISock {
	id: number;
	officer_id: number;
	location_id: number;
	model: string;
	quantity: number;
	size: number;
	manufacturing_year: string;
	lat: number;
	lon: number;
	base_name: string;
	name: string;
}

function deleteItem(id: number) {
	return fetch(`${config.apiHost}/api/delete/sock/${id}`, {
		method: "DELETE",
	}).then(async (res) => {
		if (res.ok) {
			const data = await res.json();
			return data as { success: boolean };
		} else {
			return { success: false };
		}
	});
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
							<TableCell align="center" style={{ position: "relative" }}>
								<div style={{ marginBottom: "10px" }}> {row.id}</div>
								<Popup>
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
										spacing={0}
									>
										<Link to={"/socks/edit/" + row.id}>
											<IconButton aria-label="edit">
												<DriveFileRenameOutlineIcon
													color="success"
													fontSize="small"
												/>
											</IconButton>
										</Link>
										<IconButton
											aria-label="delete"
											onClick={async () => {
												const { success } = await deleteItem(
													row.id
												);
												if (success) {
													props.deleteItemById(row.id);
												}
											}}
										>
											<DeleteIcon color="error" fontSize="small" />
										</IconButton>
									</Stack>
								</Popup>
							</TableCell>

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
										{row.manufacturing_year.split("-")[0]}
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
