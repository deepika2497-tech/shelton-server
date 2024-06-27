import express from "express";
import tournamentController from "./controller.js";

const route = express.Router();

// ----------------
// GET routes
// ----------------
route.get(
  "/:id/season/:seasonId/standings/total",
  tournamentController.getSeasonStandingsByTeams
);

export default route;
