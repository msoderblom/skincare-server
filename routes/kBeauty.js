import express from "express";
import {
  createReseller,
  createBrand,
  getAllResellers,
  getAllBrands,
  deleteBrand,
  deleteReseller,
  getReseller,
  updateReseller,
  updateBrand,
  getBrand,
} from "../controllers/kBeauty.js";
import adminAuth from "../middleware/adminAuth.js";

// Creating an express router
const router = express.Router();

// Brands
router.get("/brands/", getAllBrands);
router.post("/brands/", adminAuth, createBrand);
router.get("/brands/:id", getBrand);
router.patch("/brands/:id", adminAuth, updateBrand);
router.delete("/brands/:id", adminAuth, deleteBrand);

// Resellers
router.get("/resellers/", getAllResellers);
router.post("/resellers/", adminAuth, createReseller);
router.get("/resellers/:id", getReseller);
router.patch("/resellers/:id", adminAuth, updateReseller);
router.delete("/resellers/:id", adminAuth, deleteReseller);

export default router;
