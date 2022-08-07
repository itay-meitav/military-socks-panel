import express from 'express'

import { getLocations, getHistory, getOfficers, getSocks, getLocationsShort, getOfficersShort, getSocksShort } from '../db'
const router = express.Router()

router.get(
	"/sock/:id",
	async (req, res) => {
		const [sock, locations, officers] = await Promise.all([
			getSocks(1, { id: Number(req.params.id) }),
			getLocationsShort(),
			getOfficersShort()
		])
		if (sock?.length)
			res.render("edit/sock", { info: {}, sock: sock[0], locations, officers });
		else
			res.redirect('/socks')
	}
);


router.get(
	"/officer/:id",
	async (req, res) => {
		const officer = await getOfficers(1, { id: Number(req.params.id) })
		if (officer?.length)
			res.render("edit/officer", { info: {}, officer: officer[0] });
		else
			res.redirect('/officers')
	}
);

router.get(
	"/history/:id",
	async (req, res) => {
		const [history, locations, socks] = await Promise.all([getHistory(1, { id: Number(req.params.id) }), getLocationsShort(), getSocksShort()])
		if (history?.length)
			res.render("edit/history", { info: {}, history: history[0], locations, socks });
		else {
			res.redirect('/history')
		}
	}
);

router.get("/location/:id", async (req, res) => {
	const location = await getLocations(1, { id: Number(req.params.id) })
	if (location?.length)
		res.render("edit/location", { info: {}, location: location[0] });
	else {
		res.redirect('/locations')
	}
}
);




export default router