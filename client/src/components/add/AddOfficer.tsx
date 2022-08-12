import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Card from "../mini/Card";
import config from "../../assets/config";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

async function submitOfficer(
  name: string,
  email: string,
  phone: string,
  armyIdNumber: number
) {
  return fetch(`${config.apiHost}/api/add/officer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      armyIdNumber,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return res;
    })
    .catch((err) => err);
}

function AddOfficer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("@wpra.ru");
  const [phone, setPhone] = useState("+7");
  const [armyIdNumber, setArmyIdNumber] = useState("");
  const [alert, setAlert] = useState<string>("");

  useEffect(() => {
    setAlert("");
  }, [name, email, phone, armyIdNumber]);

  const navigate = useNavigate();

  function reset() {
    setName("");
    setEmail("@wpra.ru");
    setPhone("+7");
    setArmyIdNumber("");
  }

  return (
    <div id="container">
      <Card subTitle="" title="Add Officer">
        <form
          autoComplete={"on"}
          role="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await submitOfficer(
              name,
              email,
              phone,
              Number(armyIdNumber)
            );
            if (res.success) {
              navigate("/officers?id=" + res.id);
            } else {
              if (res.message) {
                setAlert((pre) => res.message);
              }
            }
          }}
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
                if (/^(.*[^ ])*@wpra\.ru$/.test(val)) setEmail(val);
              }}
              name="email"
              inputProps={{
                pattern: "(.*[^ ]){3,}@wpra.ru",
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
                if (/^\+(7[0-9]*|)$|^$/.test(val)) setPhone(val);
              }}
              inputProps={{
                maxLength: 12,
                inputMode: "numeric",
                type: "tel",
                pattern: "\\+[0-9]{11}",
                title: "a phone starts with +7 and has 10 digits",
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
              pattern: "[0-9]{6,8}",
              title: "army id number must have 6 to 7 digits",
            }}
            name="armyIdNumber"
            required
            value={armyIdNumber}
            onChange={(e) => {
              const val = e.currentTarget.value;
              if (/^[0-9]*$/.test(val)) setArmyIdNumber(val.substring(0, 7));
            }}
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
      </Card>
    </div>
  );
}

export default AddOfficer;
