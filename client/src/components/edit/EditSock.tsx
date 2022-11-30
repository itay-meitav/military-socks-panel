import React, { useEffect, useState } from "react";
import CardTemplate from "../Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import config from "../../assets/config";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import FormSkeleton from "../skeletons/FormSkeleton";

function getInfo(id: number, navigate: Function) {
  return fetch(`${config.apiHost}api/get/edit/sock/${id}`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      navigate("/socks");
      return { sock: {} };
    }
  });
}

async function updateSock(
  id: number,
  model: string,
  quantity: number,
  size: string,
  year: Date,
  locationId: number,
  officerId: number
) {
  return fetch(`${config.apiHost}api/edit/sock/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      quantity,
      size,
      year,
      locationId,
      officerId,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return res;
    })
    .catch((err) => err);
}

function EditSock(props: { setPage: Function }) {
  props.setPage("socks");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [year, setYear] = useState(new Date());
  const [locationId, setLocationId] = useState("");
  const [locations, setLocations] = useState<any[]>([]);
  const [officerId, setOfficerId] = useState("");
  const [officers, setOfficers] = useState<any[]>([]);
  const [alert, setAlert] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [sock, setSock] = useState<any>({});
  const [skeleton, setSkeleton] = useState(true);

  function setState(sock: any) {
    setModel(sock.model);
    setQuantity(sock.quantity);
    setSize(sock.size);
    setYear(sock.manufacturing_year);
    setLocationId(sock.location_id);
    setOfficerId(sock.officer_id);
  }

  useEffect(() => {
    getInfo(Number(id), navigate).then((data) => {
      setLocations(data.locations);
      setOfficers(data.officers);

      const sock = data.sock;
      setSock(sock);
      setState(sock);
      setSkeleton(false);
    });
  }, []);

  useEffect(() => {
    setAlert("");
  }, [model, quantity, size, year, locationId, officerId]);

  return (
    <div id="container">
      <CardTemplate title="Edit Sock">
        {skeleton ? (
          <>
            <FormSkeleton />
          </>
        ) : (
          <form
            autoComplete={"on"}
            role="form"
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await updateSock(
                Number(id),
                model,
                Number(quantity),
                size,
                year,
                Number(locationId),
                Number(officerId)
              );
              if (res.success) {
                navigate("/socks?id=" + id);
              } else {
                if (res.message) setAlert(() => res.message);
              }
            }}
          >
            <TextField
              style={{ minWidth: "50%" }}
              label="Model Name"
              placeholder="Model"
              name="model"
              required
              value={model}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setModel(val);
              }}
            />
            <div className="column">
              <TextField
                label="Quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => {
                  const val = e.currentTarget.value;
                  if (/^[0-9]*$/.test(val)) setQuantity(val);
                }}
                name="quantity"
                required
              />
              <TextField
                label="Size"
                placeholder="Size"
                value={size}
                onChange={(e) => {
                  const val = e.currentTarget.value;
                  setSize(val);
                }}
                name="size"
                required
              />
            </div>
            <div className="date-container">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/dd/yyyy"
                    label="Manufacturing year"
                    onChange={(value) => {
                      setYear(value || new Date());
                    }}
                    value={year}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="column">
              <TextField
                onChange={(select) => {
                  const val = select.target.value;
                  setLocationId(val);
                }}
                select
                label="Location"
                name="locationId"
                id="locations_list"
                helperText="Please select a location"
                required
                value={locationId}
              >
                {locations.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.base_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                onChange={(select) => {
                  const val = select.target.value;
                  setOfficerId(val);
                }}
                select
                label="Officer"
                name="officerId"
                id="officers_list"
                helperText="Please select an officer"
                required
                value={officerId}
              >
                {officers.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Stack direction="row" spacing={2}>
              <Button
                type="reset"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setState(sock)}
              >
                Reset
              </Button>
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Submit
              </Button>
            </Stack>
            {alert ? <Alert severity="error">{alert}</Alert> : <></>}
          </form>
        )}
      </CardTemplate>
    </div>
  );
}

export default EditSock;
