import express from "express";
import sportController from "./controller.js";

const route = express.Router();

// ----------------
// GET routes
// ----------------
route.get(
  "/:id/unique-tournaments",
  sportController.getLeagueTournamentList
);

export default route;
