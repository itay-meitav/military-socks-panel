import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import config from "../../assets/config";
import DateIcon from "@mui/icons-material/CalendarMonth";

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
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          {/* <TableCell>id</TableCell> */}
          <td align="center" style={{ width: 110 }}></td>
          <td align="center">id</td>
          <td align="center">Model</td>
          <td align="center">Quantity</td>
          <td align="center">Size</td>
          <td align="center">Manufacture year</td>
          <td align="center">Coordinates</td>
          <td align="center">Base name</td>
          <td align="center">Officer name</td>
          <td align="center"></td>
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row) => (
          <tr
            key={row.id}
            style={{ verticalAlign: "middle", textAlign: "center" }}
          >
            <td align="center">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              >
                <Link to={"/socks/edit/" + row.id}>
                  <IconButton
                    aria-label="edit"
                    sx={{ height: "40px", width: "40px" }}
                  >
                    <i
                      style={{ transform: `scale(0.8)` }}
                      className="bi bi-pencil-square"
                    ></i>
                  </IconButton>
                </Link>
                <IconButton
                  sx={{ height: "40px", width: "40px" }}
                  aria-label="delete"
                  onClick={async () => {
                    const { success } = await deleteItem(row.id);
                    if (success) {
                      props.deleteItemById(row.id);
                    }
                  }}
                >
                  <i
                    style={{ transform: `scale(0.8)` }}
                    className="bi bi-trash2"
                  ></i>
                </IconButton>
              </Stack>
            </td>
            <td
              align="center"
              style={{
                position: "relative",
                width: 25,
                paddingTop: 15,
              }}
            >
              <div style={{ marginBottom: "10px" }}> {row.id}</div>
            </td>
            <td align="center">{row.model}</td>
            <td align="center">{row.quantity}</td>
            <td align="center">{row.size}</td>
            <td align="center">
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
            </td>
            <td align="center">
              <Link to={"/locations?id=" + row.location_id}>
                {row.lat + "," + row.lon}
              </Link>
            </td>
            <td align="center">
              <Link to={"/locations?id=" + row.location_id}>
                {row.base_name}
              </Link>
            </td>
            <td align="center">
              <Link to={"/officers?id=" + row.officer_id}>{row.name}</Link>
            </td>
            <td align="center">
              <Link to={"/history?sock_id=" + row.id}>View History</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
