if (process.env.MODE_ENV != "production") {
	require("dotenv").config();
}

import path from "path";
import express from "express";
import cors from "cors";
import { countSocks, getAllSocks } from "./DB";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/socks", async (req, res) => {
	const page = Number(req.query.page) || 1;
	const [socks, count] = await Promise.all([getAllSocks(page), countSocks()]);
	const pages = Math.ceil(count / 20);

	res.render("socks", { socks, pages, curr_page: page });
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
