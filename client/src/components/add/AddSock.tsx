import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../mini/Card";
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
import Alert from "@mui/material/Alert";

async function getLocationsAndOfficers() {
  const response = await fetch(`${config.apiHost}/api/get/add/sock`);
  if (response.ok) {
    const data = await response.json();
    return data as { locations: any[]; officers: any[] };
  } else {
    return { locations: [], officers: [] };
  }
}

async function submitSock(
  model: string,
  quantity: number,
  size: string,
  year: Date,
  locationId: number,
  officerId: number
) {
  return fetch(`${config.apiHost}/api/add/sock`, {
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

function AddSock() {
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

  function reset() {
    setModel("");
    setQuantity("");
    setSize("");
    setYear(new Date());
    setLocationId("");
    setOfficerId("");
  }

  useEffect(() => {
    getLocationsAndOfficers().then((data) => {
      setLocations(data.locations);
      setOfficers(data.officers);
    });
  }, []);

  useEffect(() => {
    setAlert("");
  }, [model, quantity, size, year, locationId, officerId]);

  return (
    <div id="container">
      <Card subTitle="" title="Add Sock">
        <form
          autoComplete={"on"}
          role="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await submitSock(
              model,
              Number(quantity),
              size,
              year,
              Number(locationId),
              Number(officerId)
            );
            if (res.success) {
              navigate("/socks?id=" + res.id);
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
                if (/^[1-9]{0,1}$|^[1-9][0-9]$/.test(val)) setSize(val);
              }}
              name="size"
              inputProps={{
                pattern: "[1-9][0-9]?",
                title: "size must be a number from 1 to 99",
              }}
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
              onClick={reset}
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

export default AddSock;
