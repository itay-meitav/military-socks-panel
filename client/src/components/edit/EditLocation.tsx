import React, { useState } from "react";
import Card from "../Card";

function EditLocation() {
  const [base, setBase] = useState("");
  const [city, setCity] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  return (
    <div id="container">
      <Card subTitle="" title="Add History">
        <form
          action="/api/edit/location/location.id"
          autoComplete="on"
          method="post"
          role="form"
        >
          <label>Base Name</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setBase(val);
            }}
            name="base"
            type="text"
            value="location.base_name"
            required
          ></input>
          <label>Nearest City</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setCity(val);
            }}
            name="city"
            type="text"
            value="location.nearest_city"
            required
          ></input>
          <label>Longtitude</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setLon(val);
            }}
            pattern="^[-]?[0-9]{1,3}\.[0-9]{1,3}$"
            name="lon"
            maxLength={8}
            type="text"
            value="location.lon"
            required
            title="longtitude should contain up to 3 digits
							before the decimal and up to 3 after
							can also be a negative"
          ></input>
          <label>Latitude</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setLat(val);
            }}
            pattern="^[-]?[0-9]{1,3}\.[0-9]{1,3}$"
            name="lat"
            maxLength={8}
            type="text"
            value="location.lat"
            required
            title="latitude should contain up to 3 digits
							before the decimal and up to 3 after
							can also be a negative"
          ></input>
          <input type="reset" value="Reset"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </Card>
    </div>
  );
}

export default EditLocation;
