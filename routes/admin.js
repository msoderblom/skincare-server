import express from "express";
import { createAdminRole } from "../controllers/adminAuth.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.post("/admin-roles", createAdminRole);

export default router;
