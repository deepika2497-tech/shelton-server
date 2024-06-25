import express from "express";
import sportController from "./controller.js";

const route = express.Router();

// ----------------
// GET routes
// ----------------
route.get("/:sport/categories", sportController.getCategories);
route.get("/:timezoneOffset/event-count", sportController.getDailyEventCount);

export default route;
