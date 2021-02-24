import express from "express";
import { createPost, getAllPosts, getPost } from "../controllers/blog.js";
import { upload } from "../utils/imageUpload.js";
import validatePostData from "../middleware/validatePostData.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/posts/", getAllPosts);
router.get("/posts/:id", getPost);
router.post("/posts/", validatePostData, upload.array("images"), createPost); // TODO: add admin auth middleware
// router.post("/posts/", createPost); // TODO: add admin auth middleware

export default router;
