import express from 'express'

const router = express.Router()

router.get(
    "/sock",
    (req, res) => {
        res.render("add/sock", { info: {} });
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
    (req, res) => {
        res.render("add/history", { info: {} });
    }
);

router.get(
    "/location",
    (req, res) => {
        res.render("add/location", { info: {} });
    }
);




export default router