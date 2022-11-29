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
import CardTemplate from "../Card";
import config from "../../assets/config";
import { Alert, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FormSkeleton from "../skeletons/FormSkeleton";

function getInfo(id: number, navigate: Function) {
  return fetch(`${config.apiHost}/api/get/edit/history/${id}`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      navigate("/officers");
      return { officer: {} };
    }
  });
}

async function updateHistory(
  id: number,
  arrivalDate: Date,
  departureDate: Date,
  locationId: number,
  sockId: number
) {
  return fetch(`${config.apiHost}/api/edit/history/${id}`, {
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

function EditHistory(props: { setPage: Function }) {
  props.setPage("history");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [locationId, setLocationId] = useState("");
  const [sockId, setSockId] = useState("");
  const [locations, setLocations] = useState<any[]>([]);
  const [socks, setSocks] = useState<any[]>([]);
  const [alert, setAlert] = useState<string>("");
  const [skeleton, setSkeleton] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  const id = Number(params.id);

  const [history, setHistory] = useState<any>({});

  function setState(history: any) {
    setArrivalDate(history.arrival_date);
    setDepartureDate(history.departure_date);
    setLocationId(history.location_id);
    setSockId(history.sock_id);
  }

  useEffect(() => {
    getInfo(id, navigate).then((data) => {
      setLocations(data.locations);
      setSocks(data.socks);
      setHistory(data.history);
      setState(data.history);
      setSkeleton(false);
    });
  }, []);
  return (
    <div id="container">
      <CardTemplate title="Edit History">
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
              const res = await updateHistory(
                Number(id),
                arrivalDate,
                departureDate,
                Number(locationId),
                Number(sockId)
              );
              if (res.success) {
                navigate("/history?id=" + id);
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
                  setState(history);
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
        )}
      </CardTemplate>
    </div>
  );
}

export default EditHistory;
