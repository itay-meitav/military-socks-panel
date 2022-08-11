import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Card from "../Card";

const locations = [
  {
    id: 1,
    base_name: "vladimir base",
  },
];

function AddHistory() {
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [locationId, setLocationId] = useState("");
  const [sockId, setSockId] = useState("");
  return (
    <div id="container">
      <Card subTitle="" title="Add History">
        <form
          action="/api/add/history"
          method="post"
          autoComplete={"off"}
          role="form"
        >
          <TextField
            style={{ minWidth: "50%" }}
            onChange={(e) => {
              const val = e.currentTarget.value;
              setLocationId(val);
            }}
            select
            label="Location"
            name="locationId"
            helperText="Please select a location"
            required
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
                    value={departureDate}
                    onChange={(e, value) => {
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
            onChange={(e) => {
              const val = e.currentTarget.value;
              setSockId(val);
            }}
            select
            label="Sock"
            name="sockId"
            helperText="Please select a sock"
            required
          >
            {locations.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.base_name}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Reset
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default AddHistory;
