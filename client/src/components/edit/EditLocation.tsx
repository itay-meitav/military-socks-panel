import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import CardTemplate from "../Card";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../assets/config";
import { Alert } from "@mui/material";
import FormSkeleton from "../skeletons/FormSkeleton";

function getInfo(id: number, navigate: Function) {
  return fetch(`${config.apiHost}api/get/edit/location/${id}`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      navigate("/officers");
      return { location: {} };
    }
  });
}

async function updateLocation(
  id: number,
  base: string,
  city: string,
  lon: string,
  lat: string
) {
  return fetch(`${config.apiHost}api/edit/location/${id}`, {
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

function EditLocation(props: { setPage: Function }) {
  props.setPage("locations");
  const [base, setBase] = useState("");
  const [city, setCity] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [alert, setAlert] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [location, setLocation] = useState<any>({});
  const [skeleton, setSkeleton] = useState(true);

  function setState(location: any) {
    setBase(location.base_name);
    setCity(location.nearest_city);
    setLon(location.lon);
    setLat(location.lat);
  }

  useEffect(() => {
    getInfo(Number(id), navigate).then((data) => {
      setLocation(data.location);
      setState(data.location);
      setSkeleton(false);
    });
  }, []);

  return (
    <div id="container">
      <CardTemplate title="Edit location">
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
              const res = await updateLocation(
                Number(id),
                base,
                city,
                lon,
                lat
              );
              if (res.success) {
                navigate("/locations?id=" + id);
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
                onClick={() => setState(location)}
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
export default EditLocation;
