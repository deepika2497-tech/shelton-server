import express from "express";
import sportController from "./controller.js";

const route = express.Router();

// ----------------
// GET routes
// ----------------
route.get("/:sport/categories", sportController.getCountryLeagueList);
route.get("/:timezoneOffset/event-count", sportController.getSportList);

export default route;
