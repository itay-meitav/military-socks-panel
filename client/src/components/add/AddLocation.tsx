import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Card from "../Card";

function AddLocation() {
  const [base, setBase] = useState("");
  const [city, setCity] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  return (
    <div id="container">
      <Card subTitle="" title="Add Location">
        <form
          action="/api/add/location"
          autoComplete={"on"}
          method="post"
          role="form"
        >
          <TextField
            style={{ minWidth: "50%" }}
            label="Base Name"
            placeholder="Base Name"
            name="base"
            required
            onChange={(e) => {
              const val = e.currentTarget.value;
              setBase(val);
            }}
          />
          <div className="column">
            <TextField
              label="Latitude"
              placeholder="Latitude"
              onChange={(e) => {
                const val = e.currentTarget.value;
                setLat(val);
              }}
              name="lat"
              inputProps={{
                pattern: "^[-]?[0-9]{1,3}.[0-9]{1,3}$",
                maxLength: 8,
                title: `longtitude should contain up to 3 digits
							  before the decimal and up to 3 after
							  can also be a negative`,
              }}
              required
            />
            <TextField
              label="Longtitude"
              placeholder="Longtitude"
              onChange={(e) => {
                const val = e.currentTarget.value;
                setLon(val);
              }}
              name="lon"
              inputProps={{
                pattern: "^[-]?[0-9]{1,3}.[0-9]{1,3}$",
                maxLength: 8,
              }}
              title="longtitude should contain up to 3 digits
							before the decimal and up to 3 after
							can also be a negative"
              required
            />
          </div>
          <TextField
            style={{ minWidth: "50%" }}
            label="Nearest City"
            placeholder="Nearest City"
            onChange={(e) => {
              const val = e.currentTarget.value;
              setCity(val);
            }}
            name="city"
            required
          />
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

export default AddLocation;
