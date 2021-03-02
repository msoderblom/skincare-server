import express from "express";
import {
  createReseller,
  createBrand,
  getAllResellers,
  getAllBrands,
} from "../controllers/kBeauty.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/brands/", getAllBrands);
router.post("/brands/", createBrand);
router.post("/resellers/", createReseller);
router.get("/resellers/", getAllResellers);

export default router;
