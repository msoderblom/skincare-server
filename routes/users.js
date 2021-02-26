import express from "express";
import { signUp, signIn } from "../controllers/userAuth.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
