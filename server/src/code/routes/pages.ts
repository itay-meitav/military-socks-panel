import express from "express";

import {
  getSocks,
  countRows,
  getHistory,
  getLocations,
  getOfficers,
} from "../db";
const router = express.Router();

// router.get("/", (req, res) => {
//     res.render("index", { pageName: false });
// });

router.get(["/", "/socks"], async (req, res) => {
  const page = Number(req.query.page) || 1;
  const id = Number(req.query.id) || undefined;
  const officer_id = Number(req.query.officer_id) || undefined;

  const [socks, count] = await Promise.all([
    getSocks(20, (page - 1) * 20, { id, officer_id }),
    countRows("socks"),
  ]);
  let pages = Math.ceil(count / 20);
  if (id || officer_id) {
    pages = 1;
  }

  res.render("socks", {
    socks,
    pages,
    curr_page: page,
    info: { pageName: "sock" },
  });
});

router.get("/locations", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const id = Number(req.query.id) || undefined;
  const [locations, count] = await Promise.all([
    getLocations(20, (page - 1) * 20, { id }),
    countRows("locations"),
  ]);
  // console.log(count);

  let pages = Math.ceil(count / 20);
  if (id) {
    pages = 1;
  }
  res.render("locations", {
    locations,
    pages,
    curr_page: page,
    info: { pageName: "location" },
  });
});

router.get("/history", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const id = Number(req.query.id) || undefined;
  const sock_id = Number(req.query.sock_id) || undefined;
  const [history, count] = await Promise.all([
    getHistory(20, (page - 1) * 20, { id, sock_id }),
    countRows("locations_history"),
  ]);
  // console.log(count);

  let pages = Math.ceil(count / 20);
  if (id || sock_id) {
    pages = 1;
  }
  res.render("history", {
    history,
    pages,
    curr_page: page,
    info: { pageName: "history" },
  });
});

router.get("/officers", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const id = Number(req.query.id) || undefined;
  const [officers, count] = await Promise.all([
    getOfficers(20, (page - 1) * 20, { id }),
    countRows("officers"),
  ]);
  // console.log(count);

  let pages = Math.ceil(count / 20);
  if (id) {
    pages = 1;
  }
  res.render("officers", {
    officers,
    pages,
    curr_page: page,
    info: { pageName: "officer" },
  });
});

export default router;
