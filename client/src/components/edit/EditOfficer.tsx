import React from "react";
import Card from "../Card";

function EditOfficer() {
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

export default EditOfficer;

// <div class="panel panel-default">
// <div class="panel-heading">Information</div>
// <div class="panel-content">
// 	<div class="card card-outline-secondary">
// 		<div class="card-body" style="margin: 15px;">
// 			<form action="/api/edit/officer/<%= officer.id%>" method="post"
// 				autocomplete="off" class="form" role="form">
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Name</label>
// 					<div class="col-lg-9">
// 						<input name="name" class="form-control" type="text"
// 							value="<%= officer.name%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Email</label>
// 					<div class="col-lg-9">
// 						<input name="email" type="email" class="form-control"
// 							value="<%= officer.email%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Phone</label>
// 					<div class="col-lg-9">
// 						<input name="phone" maxlength="12" class="form-control" type="text"
// 							value="<%= officer.phone%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Army id
// 						number</label>
// 					<div class="col-lg-9">
// 						<input name="armyIdNumber" maxlength="7" class="form-control"
// 							type="text" value="<%= officer.army_id_number%>" required>
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
