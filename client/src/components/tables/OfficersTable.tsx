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
import Popup from "../mini/Popup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import config from "../../assets/config";

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
  rows: IOfficer[];
  deleteItemById: Function;
}

export interface IOfficer {
  id: number;
  name: string;
  army_id_number: string;
  email: string;
  phone: string;
}

function deleteItem(id: number) {
  return fetch(`${config.apiHost}/api/delete/officer/${id}`, {
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
              <TableCell align="center" style={{ position: "relative" }}>
                <div style={{ marginBottom: "10px" }}> {row.id}</div>
                <Popup>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                  >
                    <Link to={"/officers/edit/" + row.id}>
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
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.army_id_number}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">
                <Link to={"/socks?officer_id=" + row.id}>View Socks</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
