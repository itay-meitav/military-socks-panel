import * as express from "express";

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

router.get("/sock", async (req, res) => {
  const [locations, officers] = await Promise.all([
    getLocationsShort(),
    getOfficersShort(),
  ]);
  res.json({ locations, officers });
});

router.get("/history", async (req, res) => {
  const [locations, socks] = await Promise.all([
    getLocationsShort(),
    getSocksShort(),
  ]);
  res.json({ locations, socks });
});

export default router;
