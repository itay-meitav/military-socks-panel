import React from "react";
import Card from "../Card";

function AddOfficer() {
	return (
		<div id="container">
			<Card subTitle="" title="Add Officer">
				<form
					action="/api/add/officer"
					method="post"
					autoComplete={"off"}
					role="form"
				>
					<label>Name</label>
					<input name="name" type="text" required></input>
					<label>Email</label>
					<input
						name="email"
						type="email"
						value="@wpra.ru"
						required
					></input>
					<label>Phone</label>
					<input
						name="phone"
						maxLength={12}
						type="text"
						value="+7"
						required
					></input>
					<label>Army id number</label>
					<input
						name="armyIdNumber"
						maxLength={7}
						type="text"
						required
					></input>
					<input type="reset" value="Reset"></input>
					<input type="submit" value="Submit"></input>
				</form>
			</Card>
		</div>
	);
}

export default AddOfficer;
