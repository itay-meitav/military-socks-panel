import React, { useState } from "react";
import Card from "../Card";

function EditOfficer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [armyIdNumber, setArmyIdNumber] = useState("");
  return (
    <div id="container">
      <Card subTitle="" title="Add History">
        <form
          action="/api/edit/officer/officer.id"
          method="post"
          autoComplete="off"
          role="form"
        >
          <label>Name</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setName(val);
            }}
            name="name"
            type="text"
            value="officer.name"
            required
          ></input>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value="officer.email"
            required
          ></input>
          <label>Phone</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setPhone(val);
            }}
            name="phone"
            maxLength={12}
            type="text"
            value="officer.phone"
            required
          ></input>
          <label>Army id number</label>
          <input
            onInput={(e) => {
              const val = e.currentTarget.value;
              setArmyIdNumber(val);
            }}
            name="armyIdNumber"
            maxLength={7}
            type="text"
            value="officer.army_id_number"
            required
          ></input>
          <input type="reset" value="Reset"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </Card>
    </div>
  );
}

export default EditOfficer;
