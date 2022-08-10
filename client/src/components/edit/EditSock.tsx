import React from "react";
import Card from "../Card";

function EditSock() {
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

export default EditSock;

//<div class="panel panel-default">
// <div class="panel-heading">Information</div>
// <div class="panel-content">
// 	<div class="card card-outline-secondary">
// 		<div class="card-body" style="margin: 15px;">
// 			<form action="/api/edit/sock/<%= sock.id%>" method="post" autocomplete="off"
// 				class="form" role="form">
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Model
// 						Name</label>
// 					<div class="col-lg-9">
// 						<input name="model" class="form-control" type="text"
// 							value="<%= sock.model%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label
// 						class="col-lg-3 col-form-label form-control-label">Quantity</label>
// 					<div class="col-lg-9">
// 						<input name="quantity" class="form-control" type="text"
// 							value="<%= sock.quantity%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Size</label>
// 					<div class="col-lg-9">
// 						<input name="size" class="form-control" type="text"
// 							value="<%= sock.size%>" required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label class="col-lg-3 col-form-label form-control-label">Manufacturing
// 						year</label>
// 					<div class="col-lg-9">
// 						<input name="year" class="form-control" type="date"
// 							value="<%= sock.manufacturing_year.toISOString().split('T')[0] %>"
// 							required>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label
// 						class="col-lg-3 col-form-label form-control-label">Location</label>
// 					<div class="col-lg-9">
// 						<select name="locationId" class="form-control" id="officers_list"
// 							size="0" required>
// 							<% locations.forEach(location=>{ %>
// 								<option value="<%= location.id%>"
// 									<%=location.id==sock.location_id ? ' selected' : '' %>>
// 									<%= location.base_name%>
// 								</option>
// 								<% }) %>
// 						</select>
// 					</div>
// 				</div>
// 				<div class="form-group row">
// 					<label
// 						class="col-lg-3 col-form-label form-control-label">Officer</label>
// 					<div class="col-lg-9">
// 						<select name="officerId" class="form-control" id="officers_list"
// 							size="0" required>
// 							<% officers.forEach(officer=>{ %>
// 								<option value="<%= officer.id%>"
// 									<%=officer.id==sock.officer_id ? ' selected' : '' %>>
// 									<%= officer.name%>
// 								</option>
// 								<% }) %>
// 						</select>
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
