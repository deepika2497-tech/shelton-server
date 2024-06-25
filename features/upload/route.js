import upload from "../../config/multer.config.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import uploadController from "./controller.js";
import express from "express";

const route = express.Router();

// ----------------
// POST Methods
// ----------------

route.post(
  "/",
  verifyToken,
  upload.array("files"),
  uploadController.uploadFile
);

// ----------------
// DELETE Methods
// ----------------

route.delete("/", verifyToken, uploadController.deleteFile);
// ----------------
// PATCH Methods
// ----------------

route.patch(
  "/",
  verifyToken,
  upload.single("file"),
  uploadController.updateFile
);

export default route;
