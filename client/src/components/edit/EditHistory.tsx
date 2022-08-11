import React, { useState } from "react";
import Card from "../Card";

function EditHistory() {
  const [arrivalDate, setarrivalDate] = useState("");
  const [departureDate, setdepartureDate] = useState("");
  const [locationId, setlocationId] = useState("");
  const [sockId, setsockId] = useState("");
  return (
    <div id="container">
      <Card subTitle="" title="Edit History">
        <form
          action="/api/edit/history/history.id"
          method="post"
          autoComplete={"off"}
          role="form"
        >
          <label>Arrival Date</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setarrivalDate(val);
            }}
            name="arrivalDate"
            type="date"
            value="history.arrival_date.toISOString().split('T')[0]"
            required
          ></input>
          <label>Departure Date</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setdepartureDate(val);
            }}
            name="departureDate"
            type="date"
            value="history.departure_date.toISOString().split('T')[0]"
            required
          ></input>
          <label>Location</label>
          {/* <select onChange={(e) => {
              const val = e.currentTarget.value;
              setLocationId(val);
            }} name="locationId" id="officers_list" size={0} required>
						<option
							value={location.id}
							className={
								location.id == history.location_id ? "selected" : ""
							}
						>
							{location.base_name}
						</option>
					</select>
					<label>Sock</label>
					<select onChange={(e) => {
              const val = e.currentTarget.value;
              setSockId(val);
            }}name="sockId" id="officers_list" size={0} required>
						<option
							value="sock.id"
							className={sock.id == history.sock_id ? " selected" : ""}
						>
							{sock.model}
						</option>
					</select> */}
          <input type="reset" value="Reset"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </Card>
    </div>
  );
}

export default EditHistory;
