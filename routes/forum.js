import express from "express";
import {
  createThread,
  getAllThreads,
  createComment,
  getThread,
  getThreadComments,
  replyToComment,
  likeThread,
  likeComment,
} from "../controllers/forum.js";
import userAuth from "../middleware/auth.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/threads/", getAllThreads);
router.get("/threads/:id", getThread);
router.post("/threads/", userAuth, createThread); // you need to be signed in to create a thread
router.post("/threads/:id/comments", userAuth, createComment); // you need to be signed in to create a comment
router.post("/threads/:id/comments/:commentid", userAuth, replyToComment); // you need to be signed in to reply to a comment
router.get("/threads/:id/comments", getThreadComments);
router.patch("/threads/:id/like", userAuth, likeThread);
router.patch("/threads/comments/:id/like", userAuth, likeComment);

export default router;
