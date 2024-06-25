import express from "express";
import sportController from "./controller.js";

const route = express.Router();

// ----------------
// GET routes
// ----------------
route.get("/:id", sportController.getTeamDetails);
route.get("/:id/players", sportController.getTeamPLayers);
route.get("/:id/performance", sportController.getTeamPerformance);
route.get(
  "/:id/unique-tournament/:uniqueTournamentId/season/:seasonId/top-players/:type",
  sportController.getTopPlayers
);

export default route;