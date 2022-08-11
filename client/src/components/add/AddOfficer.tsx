import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Card from "../Card";

function AddOfficer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [armyIdNumber, setArmyIdNumber] = useState("");
  return (
    <div id="container">
      <Card subTitle="" title="Add Officer">
        <form
          action="/api/add/officer"
          method="post"
          autoComplete={"off"}
          role="form"
        >
          <TextField
            style={{ minWidth: "50%" }}
            label="Name"
            placeholder="Name"
            name="name"
            required
            onChange={(e) => {
              const val = e.currentTarget.value;
              setName(val);
            }}
          />
          <div className="column">
            <TextField
              label="Email"
              placeholder="Email"
              value={"@wpra.ru"}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setEmail(val);
              }}
              name="email"
              required
            />
            <TextField
              label="Phone"
              placeholder="Phone"
              onChange={(e) => {
                const val = e.currentTarget.value;
                setPhone(val);
              }}
              inputProps={{
                maxLength: 12,
              }}
              name="phone"
              required
            />
          </div>
          <TextField
            style={{ minWidth: "50%" }}
            label="Army id number"
            placeholder="Army id number"
            inputProps={{
              maxLength: 7,
            }}
            name="armyIdNumber"
            required
            onChange={(e) => {
              const val = e.currentTarget.value;
              setArmyIdNumber(val.substring(0, 7));
            }}
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

export default AddOfficer;
