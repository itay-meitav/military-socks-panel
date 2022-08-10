import React from "react";
import Card from "../Card";

function AddHistory() {
	return (
		<div id="container">
			<Card subTitle="" title="Add History">
				<form
					action="/api/add/history"
					method="post"
					autoComplete={"off"}
					role="form"
				>
					<label>Arrival Date</label>
					<input name="arrivalDate" type="date" required></input>
					<label>Departure Date</label>
					<input name="departureDate" type="date" required></input>
					<label>Location</label>
					<select name="locationId" id="officers_list" size={0} required>
						<option value="location.id">location.base_name</option>
					</select>
					<label>Sock</label>
					<select name="sockId" id="socks_list" size={0} required>
						<option value="sock.id">sock.model</option>
					</select>
					<input type="reset" value="Reset"></input>
					<input type="submit" value="Submit"></input>
				</form>
			</Card>
		</div>
	);
}

export default AddHistory;
