import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import config from "../../assets/config";

interface ISocksTableProps {
  rows: ILocation[];
  deleteItemById: Function;
}

export interface ILocation {
  id: number;
  lat: number;
  lon: number;
  base_name: string;
  nearest_city: string;
}

function deleteItem(id: number) {
  return fetch(`${config.apiHost}/api/delete/location/${id}`, {
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

export default function LocationsTable(props: ISocksTableProps) {
  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          {/* <TableCell>id</TableCell> */}
          <td align="center" style={{ width: 110 }}></td>
          <td align="center">id</td>
          <td align="center">Base name</td>
          <td align="center">Nearest city</td>
          <td align="center">Latitude</td>
          <td align="center">Longitude</td>
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
                <Link to={"/locations/edit/" + row.id}>
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
              style={{ position: "relative", width: 25, paddingTop: 15 }}
            >
              <div style={{ marginBottom: "10px" }}> {row.id}</div>
            </td>
            <td align="center">{row.base_name}</td>
            <td align="center">{row.nearest_city}</td>
            <td align="center">{row.lat}</td>
            <td align="center">{row.lon}</td>
            <td align="center">
              <Link to={"/socks?location_id=" + row.id}>View Socks</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
