import express from 'express'
// import { } from './DB'

const addRouter = express.Router()
addRouter.get(
    "/sock",
    (req, res) => {
        res.render("add", { info: {} });
    }
);


addRouter.get(
    "/officer",
    (req, res) => {
        res.render("add", { info: {} });
    }
);

addRouter.get(
    "/history",
    (req, res) => {
        res.render("add", { info: {} });
    }
);

addRouter.get(
    "/location",
    (req, res) => {
        res.render("add", { info: {} });
    }
);




export default addRouter