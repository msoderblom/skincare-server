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

// Creating an express router
const router = express.Router();

// Brands
router.get("/brands/", getAllBrands);
router.post("/brands/", createBrand);
router.get("/brands/:id", getBrand);
router.patch("/brands/:id", updateBrand);
router.delete("/brands/:id", deleteBrand);

// Resellers
router.get("/resellers/", getAllResellers);
router.post("/resellers/", createReseller);
router.get("/resellers/:id", getReseller);
router.patch("/resellers/:id", updateReseller);
router.delete("/resellers/:id", deleteReseller);

export default router;
