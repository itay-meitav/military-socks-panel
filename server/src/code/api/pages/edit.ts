import express from "express";

import {
	getLocations,
	getHistory,
	getOfficers,
	getSocks,
	getLocationsShort,
	getOfficersShort,
	getSocksShort,
} from "../../db";
const router = express.Router();

router.get("/sock/:id", async (req, res) => {
	const [sock, locations, officers] = await Promise.all([
		getSocks(2, 0, { id: Number(req.params.id) }),
		getLocationsShort(),
		getOfficersShort(),
	]);
	if (sock?.length)
		res.json({ sock: sock[0], locations, officers, success: true });
	else
		res.json({
			success: false,
			message: "could'nt find a sock with that id",
		});
});

router.get("/officer/:id", async (req, res) => {
	const officer = await getOfficers(2, 0, { id: Number(req.params.id) });
	if (officer?.length) res.json({ officer: officer[0], success: true });
	else
		res.json({
			success: false,
			message: "could'nt find an officer with that id",
		});
});

router.get("/history/:id", async (req, res) => {
	const [history, locations, socks] = await Promise.all([
		getHistory(2, 0, { id: Number(req.params.id) }),
		getLocationsShort(),
		getSocksShort(),
	]);
	if (history?.length)
		res.json({
			history: history[0],
			locations,
			socks,
			success: true,
		});
	else {
		res.json({
			success: false,
			message: "could'nt find a location history with this id",
		});
	}
});

router.get("/location/:id", async (req, res) => {
	const location = await getLocations(2, 0, { id: Number(req.params.id) });
	if (location?.length) res.json({ location: location[0], success: true });
	else {
		res.json({
			success: false,
			message: "could'nt find a location with this id",
		});
	}
});

export default router;
