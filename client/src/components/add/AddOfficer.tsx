import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Card from "../Card";

function AddOfficer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("@wpra.ru");
  const [phone, setPhone] = useState("+7");
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
            value={name}
            onChange={(e) => {
              const val = e.currentTarget.value;
              setName(val);
            }}
          />
          <div className="column">
            <TextField
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                const val = e.currentTarget.value;
                if (/^.*[^ ]*@wpra\.ru$/.test(val)) setEmail(val);
              }}
              name="email"
              inputProps={{
                pattern: ".{3,}@wpra.ru",
                title: "the format is user@wpra.ru. user must be over 3 letter",
              }}
              required
            />
            <TextField
              label="Phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => {
                const val = e.currentTarget.value;
                if (/^\+[0-9]*$/.test(val)) setPhone(val);
              }}
              inputProps={{
                maxLength: 12,
                inputMode: "numeric",
                type: "tel",
                pattern: "+[0-9]{10}",
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
            <Button type="reset" variant="outlined" startIcon={<DeleteIcon />}>
              Reset
            </Button>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default AddOfficer;
