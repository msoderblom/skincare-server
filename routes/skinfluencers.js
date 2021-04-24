import express from "express";
import {
  createSkinfluencer,
  deleteSkinfluencer,
  getAllSkinfluencers,
  updateSkinfluencer,
} from "../controllers/skinfluencers.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/", getAllSkinfluencers);
router.post("/", createSkinfluencer);
router.delete("/:id", deleteSkinfluencer);
router.patch("/:id", updateSkinfluencer);

export default router;
