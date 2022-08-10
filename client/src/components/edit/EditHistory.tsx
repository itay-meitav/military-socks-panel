import React from "react";
import Card from "../Card";

function EditHistory() {
	return (
		<div id="container">
			<Card subTitle="" title="Edit History">
				<form
					action="/api/edit/history/<%= history.id%>"
					method="post"
					autoComplete={"off"}
					role="form"
				>
					<label>Arrival Date</label>
					<input
						name="arrivalDate"
						type="date"
						value="history.arrival_date.toISOString().split('T')[0]"
						required
					></input>
					<label>Departure Date</label>
					<input
						name="departureDate"
						type="date"
						value="history.departure_date.toISOString().split('T')[0]"
						required
					></input>
					<label>Location</label>
					{/* <select name="locationId" id="officers_list" size={0} required>
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
					<select name="sockId" id="officers_list" size={0} required>
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
