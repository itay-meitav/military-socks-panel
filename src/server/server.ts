if (process.env.MODE_ENV != "production") {
	require("dotenv").config();
}

import path from "path";
import express from "express";
import cors from "cors";
import { countRows, getLocations, getSocks, getOfficers, getHistory } from "./DB";
import pages from './pages'

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());


app.get(["/add/socks", "/add/officers", "/add/history", "/add/locations"], (req, res) => {
	res.render("add");
});

app.use(pages)

app.use(express.static(path.join(__dirname, "../client")));

app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		credentials: true,
		origin: true,
	})
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
