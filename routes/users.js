import express from "express";
import { signUp, signIn } from "../controllers/userAuth.js";
import { getAllUsers } from "../controllers/users.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.post("/signup", signUp);
router.post("/signin", signIn);

// Admin routes
router.get("/", getAllUsers); // TODO: Add admin auth

export default router;
