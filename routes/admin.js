import express from "express";
import { createAdminRole, createAdminUser } from "../controllers/adminAuth.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.post("/admin-roles", createAdminRole);
router.post("/admin-users", createAdminUser);

export default router;
