import express from "express";
const router = express.Router();
import {
	deleteHistory,
	removeLocation,
	removeOfficer,
	deleteSock,
} from "../db";

router.delete("/sock/:id", async (req, res) => {
	const id = Number(req.params.id);
	console.log(id);

	const data = await deleteSock(id);
	console.log(data);
	res.json({ success: true });
});

router.delete("/location/:id", async (req, res) => {
	await removeLocation(Number(req.params.id));
	res.json({ success: true });
});

router.delete("/history/:id", async (req, res) => {
	await deleteHistory(Number(req.params.id));
	res.json({ success: true });
});

router.delete("/officer/:id", async (req, res) => {
	await removeOfficer(Number(req.params.id));
	res.json({ success: true });
});

export default router;
