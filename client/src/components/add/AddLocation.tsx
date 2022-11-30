import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import CardTemplate from "../Card";
import config from "../../assets/config";
import Alert from "@mui/material/Alert";

async function submitLocation(
  base: string,
  city: string,
  lon: string,
  lat: string
) {
  return fetch(`${config.apiHost}api/add/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base,
      city,
      lon,
      lat,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return res;
    })
    .catch((err) => err);
}

function AddLocation(props: { setPage: Function }) {
  props.setPage("locations");
  const [base, setBase] = useState("");
  const [city, setCity] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [alert, setAlert] = useState<string>("");
  const navigate = useNavigate();

  function reset() {
    setBase("");
    setCity("");
    setLon("");
    setLat("");
  }

  return (
    <div id="container">
      <CardTemplate title="Add Location">
        <form
          autoComplete={"on"}
          role="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await submitLocation(base, city, lon, lat);
            if (res.success) {
              navigate("/locations?id=" + res.id);
            } else {
              if (res.message) setAlert(() => res.message);
            }
          }}
        >
          <TextField
            style={{ minWidth: "50%" }}
            label="Base Name"
            placeholder="Base Name"
            name="base"
            required
            value={base}
            onChange={(e) => {
              const val = e.currentTarget.value;
              setBase(val);
            }}
          />
          <div className="column">
            <TextField
              label="Latitude"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => {
                const val = e.currentTarget.value;
                if (/^\-?[0-9]{0,3}(\.[0-9]{0,3})?$/.test(val)) setLat(val);
              }}
              name="lat"
              inputProps={{
                inputMode: "numeric",
                pattern: "^[\\-]?[0-9]{1,3}\\.[0-9]{1,3}$",
                maxLength: 8,
                title: `latitude should contain up to 3 digits\nbefore the decimal and up to 3 after\ncan also be a negative`,
              }}
              required
            />
            <TextField
              label="Longtitude"
              placeholder="Longtitude"
              value={lon}
              onChange={(e) => {
                const val = e.currentTarget.value;
                if (/^\-?[0-9]{0,3}(\.[0-9]{0,3})?$/.test(val)) setLon(val);
              }}
              name="lon"
              inputProps={{
                inputMode: "numeric",
                pattern: "^[\\-]?[0-9]{1,3}\\.[0-9]{1,3}$",
                maxLength: 8,
                title: `longtitude should contain up to 3 digits\nbefore the decimal and up to 3 after\ncan also be a negative`,
              }}
              required
            />
          </div>
          <TextField
            style={{ minWidth: "50%" }}
            label="Nearest City"
            placeholder="Nearest City"
            value={city}
            onChange={(e) => {
              const val = e.currentTarget.value;
              setCity(val);
            }}
            name="city"
            required
          />
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
      </CardTemplate>
    </div>
  );
}

export default AddLocation;
