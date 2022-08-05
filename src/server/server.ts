if (process.env.MODE_ENV != "production") {
	require("dotenv").config();
}

import path from "path";
import express from "express";
import cors from "cors";
import { countRows, getLocations, getSocks } from "./DB";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/socks", async (req, res) => {
	const page = Number(req.query.page) || 1;
	const [socks, count] = await Promise.all([
		getSocks(page),
		countRows("socks"),
	]);
	const pages = Math.ceil(count / 20);

	res.render("socks", { socks, pages, curr_page: page });
});

app.get("/locations", async (req, res) => {
	const page = Number(req.query.page) || 1;
	const id = Number(req.query.id) || undefined;
	const [locations, count] = await Promise.all([
		getLocations(page, id),
		countRows("locations"),
	]);
	// console.log(count);

	const pages = Math.ceil(count / 20);

	res.render("locations", { locations, pages, curr_page: page });
});

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
