import React, { useState } from "react";
import Card from "../Card";

function EditSock() {
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [year, setYear] = useState("");
  const [locationId, setLocationId] = useState("");
  const [officerId, setOfficerId] = useState("");
  return (
    <div id="container">
      <Card subTitle="" title="Add History">
        <form
          action="/api/edit/sock/sock.id"
          method="post"
          autoComplete="off"
          role="form"
        >
          <label>Model Name</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setModel(val);
            }}
            name="model"
            type="text"
            value="sock.model"
            required
          ></input>
          <label>Quantity</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setQuantity(val);
            }}
            name="quantity"
            type="text"
            value="sock.quantity"
            required
          ></input>
          <label>Size</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setSize(val);
            }}
            name="size"
            type="text"
            value="sock.size"
            required
          ></input>
          <label>Manufacturing year</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setYear(val);
            }}
            name="year"
            type="date"
            value="sock.manufacturing_year.toISOString().split('T')[0] "
            required
          ></input>
          <label>Location</label>
          {/* <select onChange={(e) => {
              const val = e.currentTarget.value;
              setLocationId(val);
            }} name="locationId" id="officers_list" size={0} required>
								<option value="location.id" className={location.id==sock.location_id ? ' selected' : ''}>
									location.base_name
								</option>
						</select>
					<label>Officer</label>
						<select   onChange={(e) => {
              const val = e.currentTarget.value;
              setOfficerId(val);
            }} name="officerId" id="officers_list" size={0} required>
								<option value="officer.id" className={officer.id==sock.officer_id ? ' selected' : ''}>
									officer.name
								</option>
						</select> */}
          <input type="reset" value="Reset"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </Card>
    </div>
  );
}

export default EditSock;
