import React from "react";
import Card from "../Card";

function EditLocation() {
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

export default EditLocation;

// <div class="panel panel-default">
// <div class="panel-heading">Information</div>
// <div class="panel-content">
// 	<div class="card card-outline-secondary">
// 		<div class="card-body" style="margin: 15px;">
// 			<form action="/api/edit/location/<%= location.id%>" autocomplete="on"
// 				method="post" class="form" role="form">
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Base
// 						Name</label>
// 					<div class="col-lg-9">
// 						<input name="base" class="form-control" type="text"
// 							value="<%= location.base_name%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Nearest
// 						City</label>
// 					<div class="col-lg-9">
// 						<input name="city" class="form-control" type="text"
// 							value="<%= location.nearest_city%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label
// 						class="col-lg-3 col-form-label form-control-label">Longtitude</label>
// 					<div class="col-lg-9">
// 						<input pattern="^[-]?[0-9]{1,3}\.[0-9]{1,3}$" name="lon"
// 							maxlength="8" class="form-control" type="text"
// 							value="<%= location.lon%>" required title="longtitude should contain up to 3 digits
// 							before the decimal and up to 3 after
// 							can also be a negative">
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label
// 						class="col-lg-3 col-form-label form-control-label">Latitude</label>
// 					<div class="col-lg-9">
// 						<input pattern="^[-]?[0-9]{1,3}\.[0-9]{1,3}$" name="lat"
// 							maxlength="8" class="form-control" type="text"
// 							value="<%= location.lat%>" required title="latitude should contain up to 3 digits
// 							before the decimal and up to 3 after
// 							can also be a negative">
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label"></label>
// 					<div class="col-lg-9">
// 						<input class="btn btn-secondary" type="reset" value="Reset">
// 						<input class="btn btn-primary" type="submit" value="Submit">
// 					</div>
// 				</div>
// 			</form>
// 		</div>
// 	</div>
// </div>
// </div>
// </div>
