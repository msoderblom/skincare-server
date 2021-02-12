import express from "express";
import { createThread } from "../controllers/forum.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.post("/threads/", createThread);

export default router;
