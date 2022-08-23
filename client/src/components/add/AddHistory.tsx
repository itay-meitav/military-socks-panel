import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Card from "../mini/Card";
import { useNavigate } from "react-router-dom";
import config from "../../assets/config";
import Alert from "@mui/material/Alert";

async function getLocationsAndSocks() {
  const response = await fetch(`${config.apiHost}/api/get/add/history`);
  if (response.ok) {
    const data = await response.json();
    return data as { locations: any[]; socks: any[] };
  } else {
    return { locations: [], socks: [] };
  }
}

async function submitHistory(
  arrivalDate: Date,
  departureDate: Date,
  locationId: number,
  sockId: number
) {
  return fetch(`${config.apiHost}/api/add/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      arrivalDate,
      departureDate,
      locationId,
      sockId,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return res;
    })
    .catch((err) => err);
}

function AddHistory(props: { setPage: Function }) {
  props.setPage("history");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [locationId, setLocationId] = useState("");
  const [sockId, setSockId] = useState("");
  const [locations, setLocations] = useState<any[]>([]);
  const [socks, setSocks] = useState<any[]>([]);
  const [alert, setAlert] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getLocationsAndSocks().then((data) => {
      setLocations(data.locations);
      setSocks(data.socks);
    });
  }, []);

  function reset() {
    setArrivalDate(new Date());
    setDepartureDate(new Date());
    setLocationId("");
    setSockId("");
  }

  return (
    <div id="container">
      <Card subTitle="" title="Add History">
        <form
          autoComplete={"on"}
          role="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await submitHistory(
              arrivalDate,
              departureDate,
              Number(locationId),
              Number(sockId)
            );
            if (res.success) {
              navigate("/history?id=" + res.id);
            } else {
              if (res.message) setAlert(() => res.message);
            }
          }}
        >
          <TextField
            style={{ minWidth: "50%" }}
            onChange={(select) => {
              const val = select.target.value;
              setLocationId(val);
            }}
            select
            label="Location"
            name="locationId"
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
          <div className="column">
            <div className="date-container">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/dd/yyyy"
                    label="Departure Date"
                    value={departureDate as Date}
                    onChange={(value) => {
                      setDepartureDate(value || new Date());
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="date-container">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/dd/yyyy"
                    label="Arrival Date"
                    value={arrivalDate}
                    onChange={(value) => {
                      setArrivalDate(value || new Date());
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>
          <TextField
            style={{ minWidth: "50%" }}
            onChange={(select) => {
              const val = select.target.value;
              setSockId(val);
            }}
            select
            label="Sock"
            name="sockId"
            helperText="Please select a sock"
            required
            value={sockId}
          >
            {socks.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.model}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2}>
            <Button
              type="reset"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Stack>
          {alert ? <Alert severity="error">{alert}</Alert> : <></>}
        </form>
      </Card>
    </div>
  );
}

export default AddHistory;
