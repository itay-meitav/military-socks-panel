import { Router } from "express";
import {
	getLocationsOptions,
	getOfficersOptions,
	getSocksOptions,
} from "../../db";

const searchOptionsRouter = Router();

searchOptionsRouter.get("/socks", async (req, res) => {
	res.json(await getSocksOptions());
});

searchOptionsRouter.get("/locations", async (req, res) => {
	res.json(await getLocationsOptions());
});

searchOptionsRouter.get("/officers", async (req, res) => {
	res.json(await getOfficersOptions());
});
// router.get("/history",(req,res)=>{});
export default searchOptionsRouter;
