import React, { useState } from "react";
import Card from "../Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const locations = [
	{
		id: 1,
		base_name: "vladimir base",
	},
];

function EditSock() {
	const [model, setModel] = useState("");
	const [quantity, setQuantity] = useState("");
	const [size, setSize] = useState("");
	const [year, setYear] = useState(new Date());
	const [location, setLocation] = useState("");
	const [officer, setOfficer] = useState("");
	return (
		<div id="container">
			<Card subTitle="" title="Add Sock">
				<form
					action="/api/add/sock"
					method="post"
					autoComplete={"on"}
					role="form"
				>
					<TextField
						style={{ minWidth: "50%" }}
						label="Model Name"
						placeholder="Model"
						name="model"
						required
						onChange={(e) => {
							const val = e.currentTarget.value;
							setModel(val);
						}}
					/>
					<div className="column">
						<TextField
							label="Quantity"
							placeholder="Quantity"
							onChange={(e) => {
								const val = e.currentTarget.value;
								setQuantity(val);
							}}
							name="quantity"
							required
						/>
						<TextField
							label="Size"
							placeholder="Size"
							onChange={(e) => {
								const val = e.currentTarget.value;
								setSize(val);
							}}
							name="size"
							required
						/>
					</div>
					<div className="date-container">
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Stack spacing={3}>
								<DesktopDatePicker
									renderInput={(params) => <TextField {...params} />}
									inputFormat="MM/dd/yyyy"
									label="Manufacturing year"
									onChange={(value) => {
										setYear(value || new Date());
									}}
									value={year}
								/>
							</Stack>
						</LocalizationProvider>
					</div>
					<div className="column">
						<TextField
							onChange={(e) => {
								const val = e.currentTarget.value;
								setLocation(val);
							}}
							select
							label="Location"
							name="locationId"
							id="locations_list"
							helperText="Please select a location"
							required
						>
							{locations.map((option) => (
								<MenuItem key={option.id} value={option.id}>
									{option.base_name}
								</MenuItem>
							))}
						</TextField>
						<TextField
							onChange={(e) => {
								const val = e.currentTarget.value;
								setOfficer(val);
							}}
							select
							label="Officer"
							name="officerId"
							id="officers_list"
							helperText="Please select an officer"
							required
						>
							{locations.map((option) => (
								<MenuItem key={option.id} value={option.id}>
									{option.base_name}
								</MenuItem>
							))}
						</TextField>
					</div>
					<Stack direction="row" spacing={2}>
						<Button
							type="reset"
							variant="outlined"
							startIcon={<DeleteIcon />}
						>
							Reset
						</Button>
						<Button
							type="submit"
							variant="contained"
							endIcon={<SendIcon />}
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Card>
		</div>
	);
}

export default EditSock;
