import express from "express";
import {
  createThread,
  getAllThreads,
  createComment,
} from "../controllers/forum.js";
import userAuth from "../middleware/auth.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/threads/", getAllThreads);
router.post("/threads/", userAuth, createThread); // you need to be signed in to create a thread
router.post("/threads/:id/comments", userAuth, createComment); // you need to be signed in to create a comment

export default router;
