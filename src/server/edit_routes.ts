import express from "express";

import {
	getSocks,
	countRows,
	getHistory,
	getLocations,
	getOfficers,
} from "./DB";
const editRouter = express.Router();

// router.get("/", (req, res) => {
//     res.render("index", { pageName: false });
// });

editRouter.get("/sock/:id", async (req, res) => {
	res.send("edit sock " + req.params.id);
});

editRouter.get("/location/:id", async (req, res) => {
	res.send("edit location " + req.params.id);
});

editRouter.get("/history/:id", async (req, res) => {
	res.send("edit history " + req.params.id);
});

editRouter.get("/officer/:id", async (req, res) => {
	res.send("edit officer " + req.params.id);
});

export default editRouter;
