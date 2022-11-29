import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import config from "../../assets/config";

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
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr style={{ textAlign: "center" }}>
          <th></th>
          <th>id</th>
          <th>Model</th>
          <th>Arrival</th>
          <th>Departure</th>
          <th>Coordinates</th>
          <th>Base Name</th>
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
                <Link to={"/history/edit/" + row.id}>
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
            <td align="center" style={{ position: "relative", paddingTop: 15 }}>
              <div style={{ marginBottom: "10px" }}> {row.id}</div>
            </td>
            <td align="center">{row.model}</td>
            <td align="center">
              {row.arrival_date
                // .toISOString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </td>
            <td align="center">
              {row.departure_date
                // .toISOString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
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
            {/* <TableCell align="center">
								<Link to={"/locations?id=" + row.location_id}>
									{row.base_name}
								</Link>
							</TableCell> */}
            <td align="center">
              <Link to={"/socks?id=" + row.sock_id}>View Sock</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
