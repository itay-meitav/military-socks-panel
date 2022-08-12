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

interface IHistoryTableProps {
  rows: IHistory[];
  deleteItemById: Function;
}

export interface IHistory {
  id: number;
  model: string;
  arrival_date: string;
  departure_date: string;
  location_id: number;
  sock_id: number;
  lat: number;
  lon: number;
  base_name: string;
}

function deleteItem(id: number) {
  return fetch(`${config.apiHost}/api/delete/history/${id}`, {
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
            <TableCell align="center">Base Name</TableCell>
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
                    <Link to={"/history/edit/" + row.id}>
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
                        const { success } = await deleteItem(row.id);
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
              <TableCell align="center">
                {row.arrival_date
                  // .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </TableCell>
              <TableCell align="center">
                {row.departure_date
                  // .toISOString()
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
              <TableCell align="center">
                <Link to={"/locations?id=" + row.location_id}>
                  {row.base_name}
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
