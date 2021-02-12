import express from "express";
import { createThread } from "../controllers/forum.js";
import userAuth from "../middleware/auth.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.post("/threads/", userAuth, createThread); // you need to be signed in to create a thread

export default router;
