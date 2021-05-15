import express from "express";
import {
  createAdminRole,
  createAdminUser,
  signIn,
} from "../controllers/adminAuth.js";
import { getStatistics } from "../controllers/statistics.js";
import adminAuth from "../middleware/adminAuth.js";

// Creating an express router
const router = express.Router();

// Defining routes
// router.get("/statistics", adminAuth, getStatistics);
router.get("/statistics", getStatistics);
router.post("/admin-roles", adminAuth, createAdminRole);
router.post("/admin-users", adminAuth, createAdminUser);
router.post("/signin", signIn);

export default router;
