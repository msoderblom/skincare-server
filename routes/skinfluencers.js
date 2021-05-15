import express from "express";
import {
  createSkinfluencer,
  deleteSkinfluencer,
  getAllSkinfluencers,
  updateSkinfluencer,
  getSkinfluencer,
} from "../controllers/skinfluencers.js";
import adminAuth from "../middleware/adminAuth.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/", getAllSkinfluencers);
router.post("/", adminAuth, createSkinfluencer);
router.delete("/:id", adminAuth, deleteSkinfluencer);
router.patch("/:id", adminAuth, updateSkinfluencer);
router.get("/:id", getSkinfluencer);

export default router;
