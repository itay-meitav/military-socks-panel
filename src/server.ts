if (process.env.MODE_ENV != "production") {
	require("dotenv").config();
}

import path from "path";
import express from "express";
import cors from "cors";
import {
	countRows,
	getLocations,
	getSocks,
	getOfficers,
	getHistory,
} from "./code/db";
import pageRoutes from "./code/routes/index";
import RestApi from "./api/index";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		credentials: true,
		origin: true,
	})
);
app.use("/api", RestApi);
app.use(pageRoutes);

app.use(express.static(path.join(__dirname, "./public")));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
