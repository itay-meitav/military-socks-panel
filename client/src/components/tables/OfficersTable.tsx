import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import config from "../../assets/config";

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
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          {/* <TableCell>id</TableCell> */}
          <td align="center" style={{ width: 110 }}></td>
          <td align="center">id</td>
          <td align="center">Name</td>
          <td align="center">Army Id Number</td>
          <td align="center">Email</td>
          <td align="center">Phone</td>
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
                <Link to={"/officers/edit/" + row.id}>
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
            <td align="center">{row.name}</td>
            <td align="center">{row.army_id_number}</td>
            <td align="center">{row.email}</td>
            <td align="center">{row.phone}</td>
            <td align="center">
              <Link to={"/socks?officer_id=" + row.id}>View Socks</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
