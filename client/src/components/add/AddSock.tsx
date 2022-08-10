import React from "react";
import Card from "../Card";

function AddSock() {
	return (
		<div id="container">
			<Card subTitle="" title="Add Sock">
				<form
					action="/api/add/sock"
					method="post"
					autoComplete={"off"}
					role="form"
				>
					<label>Model Name</label>
					<input name="model" type="text" required></input>
					<label>Quantity</label>
					<input name="quantity" type="text" required></input>
					<label>Size</label>
					<input name="size" type="text" required></input>
					<label>Manufacturing year</label>
					<input name="year" type="date" required></input>
					<label>Location</label>
					<select name="locationId" id="locations_list" size={0} required>
						<option value="location.id">location.base_name</option>
					</select>
					<label>Officer</label>
					<select name="officerId" id="officers_list" size={0} required>
						<option value="officer.id">officer.name</option>
					</select>
					<input type="reset" value="Reset"></input>
					<input type="submit" value="Submit"></input>
				</form>
			</Card>
		</div>
	);
}

export default AddSock;
