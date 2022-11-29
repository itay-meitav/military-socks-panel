import express from "express";
import pages from "./pages";
import edit from "./edit";
import add from "./add";
import searchOptions from "./searchOptions";

const router = express.Router();

router.use("/", pages);
router.use("/edit", edit);
router.use("/add", add);
router.use("/search-options", searchOptions);

export default router;
