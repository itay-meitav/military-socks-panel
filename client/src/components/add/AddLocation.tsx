import React from "react";
import Card from "../Card";

function AddLocation() {
	return (
		<div id="container">
			<Card subTitle="" title="Add Location">
				<form
					action="/api/add/location"
					autoComplete={"on"}
					method="post"
					role="form"
				>
					<label>Base Name</label>
					<input name="base" type="text" required></input>
					<label>Nearest City</label>
					<input name="city" type="text" required></input>
					<label>Longtitude</label>
					<input
						pattern={"^[-]?[0-9]{1,3}.[0-9]{1,3}$"}
						name="lon"
						maxLength={8}
						type="text"
						required
						title="longtitude should contain up to 3 digits
							before the decimal and up to 3 after
							can also be a negative"
					></input>
					<label>Latitude</label>
					<input
						pattern="^[-]?[0-9]{1,3}\.[0-9]{1,3}$"
						name="lat"
						maxLength={8}
						type="text"
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

export default AddLocation;
