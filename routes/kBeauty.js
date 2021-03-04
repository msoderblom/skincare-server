import express from "express";
import {
  createReseller,
  createBrand,
  getAllResellers,
  getAllBrands,
  deleteBrand,
  deleteReseller,
} from "../controllers/kBeauty.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/brands/", getAllBrands);
router.post("/brands/", createBrand);
router.delete("/brands/:id", deleteBrand);
router.post("/resellers/", createReseller);
router.delete("/resellers/:id", deleteReseller);
router.get("/resellers/", getAllResellers);

export default router;
