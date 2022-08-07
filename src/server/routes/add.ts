import express from 'express'

import { getLocations, getHistory, getOfficers, getSocks, getLocationsShort, getOfficersShort, getSocksShort } from '../db'
const router = express.Router()

router.get(
    "/sock",
    async (req, res) => {
        const [locations, officers] = await Promise.all([
            getLocationsShort(),
            getOfficersShort()
        ])
        res.render("add/sock", { info: {}, locations, officers });
    }
);


router.get(
    "/officer",
    (req, res) => {
        res.render("add/officer", { info: {} });
    }
);

router.get(
    "/history",
    async (req, res) => {
        const [locations, socks] = await Promise.all([getLocationsShort(), getSocksShort()])
        res.render("add/history", { info: {}, locations, socks });
    }
);

router.get(
    "/location",
    (req, res) => {
        res.render("add/location", { info: {} });
    }
);




export default router