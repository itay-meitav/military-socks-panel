import express from "express";

import {
  getSocks,
  countRows,
  getHistory,
  getLocations,
  getOfficers,
} from "../../db";
const router = express.Router();

router.get("/socks", async (req, res) => {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const id = Number(req.query.id) || undefined;
  const officer_id = Number(req.query.officer_id) || undefined;
  const location_id = Number(req.query.location_id) || undefined;
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : undefined;

  const [socks, count] = await Promise.all([
    getSocks(limit, offset, {
      id,
      officer_id,
      location_id,
      orderBy,
    }),
    countRows("socks"),
  ]);

  const pages = Math.ceil(count / limit);

  res.json({
    socks,
    pages,
    success: true,
  });
});

router.get("/locations", async (req, res) => {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const id = Number(req.query.id) || undefined;
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : undefined;
  const [locations, count] = await Promise.all([
    getLocations(limit, offset, { id, orderBy }),
    countRows("locations"),
  ]);

  let pages = Math.ceil(count / limit);
  res.json({
    locations,
    pages,
    success: true,
  });
});

router.get("/history", async (req, res) => {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const id = Number(req.query.id) || undefined;
  const sock_id = Number(req.query.sock_id) || undefined;
  const location_id = Number(req.query.location_id) || undefined;
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : undefined;
  const [history, count] = await Promise.all([
    getHistory(limit, offset, { id, sock_id, location_id, orderBy }),
    countRows("locations_history"),
  ]);

  let pages = Math.ceil(count / 20);

  res.json({
    history,
    pages,
    success: true,
  });
});

router.get("/officers", async (req, res) => {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const id = Number(req.query.id) || undefined;
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : undefined;
  const [officers, count] = await Promise.all([
    getOfficers(limit, offset, { id, orderBy }),
    countRows("officers"),
  ]);

  let pages = Math.ceil(count / 20);
  res.json({
    officers,
    pages,
    success: true,
  });
});

export default router;
