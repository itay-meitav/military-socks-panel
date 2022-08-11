import express from "express";
import {
	isArmyIdExists,
	isBaseExists,
	isSockExists,
	isOfficerExists,
	isLocationExists,
	addHistory,
	addLocation,
	addOfficer,
	addSock,
} from "../db";

const router = express.Router();

router.post("/sock", async (req, res) => {
	const { model, officerId, quantity, size, year, locationId } = req.body;

	if (model && officerId && quantity && size && year && locationId) {
		const isExists = (
			await Promise.all([
				isLocationExists(Number(locationId)),
				isOfficerExists(Number(officerId)),
			])
		).every(Boolean);
		if (isExists) {
			const id = await addSock({
				model,
				officerId,
				quantity,
				size,
				year,
				locationId,
			});
			if (id) res.json({ id, success: true });
			else
				res.json({
					message: "something went wrong please try again later",
					success: false,
				});
		} else {
			res.json({
				message: "don't play with our api, you'll get yourself banned",
				success: false,
			});
		}
	} else {
		res.json({
			message: "make sure to send all the necessary fields",
			success: false,
		});
	}
});
router.post("/location", async (req, res) => {
	const { city, base, lon, lat } = req.body;

	if (city && base && lon && lat) {
		const isExist = await isBaseExists(base);

		if (isExist) {
			res.json({ message: "this base already exists", success: false });
		} else {
			const id = await addLocation({
				nearestCity: city,
				baseName: base,
				lon,
				lat,
			});
			res.json({ id, success: true });
		}
	} else {
		res.json({
			message: "make sure you have all the necessary fields",
			success: false,
		});
	}
});
router.post("/history", async (req, res) => {
	const { arrivalDate, departureDate, locationId, sockId } = req.body;

	if (arrivalDate && departureDate && locationId && sockId) {
		const isExists = (
			await Promise.all([
				isLocationExists(Number(locationId)),
				isSockExists(Number(sockId)),
			])
		).every(Boolean);

		if (isExists) {
			const id = await addHistory({
				arrivalDate,
				departureDate,
				locationId,
				sockId,
			});
			res.json({ id, success: true });
		} else {
			res.json({
				message: "don't play with our api. it's not a playground",
				success: false,
			});
		}
	} else {
		res.json({
			message: "make sure to fill all the necessary fields",
			success: false,
		});
	}
});
router.post("/officer", async (req, res) => {
	const { email, name, phone, armyIdNumber } = req.body;

	if (email && name && phone && armyIdNumber) {
		const details = {
			email,
			name,
			phone,
			armyIdNumber,
		};
		const isExists = await isArmyIdExists(armyIdNumber);
		if (isExists)
			res.json({ message: "army id already exists", success: false });
		else {
			const id = await addOfficer(details);
			res.json({
				id,
				success: !!id,
				message: id
					? undefined
					: "something went wrong while trying to save the officer",
			});
		}
	} else {
		res.json({
			message: "make sure you have all the fields needed",
			success: false,
		});
	}
});

export default router;
