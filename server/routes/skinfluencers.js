import express from "express";
import {
  createSkinfluencer,
  getAllSkinfluencers,
} from "../controllers/skinfluencers.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/", getAllSkinfluencers);
router.post("/", createSkinfluencer);

export default router;
