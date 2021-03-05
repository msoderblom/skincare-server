import express from "express";
import {
  createReseller,
  createBrand,
  getAllResellers,
  getAllBrands,
  deleteBrand,
  deleteReseller,
  getReseller,
} from "../controllers/kBeauty.js";

// Creating an express router
const router = express.Router();

// Defining routes
router.get("/brands/", getAllBrands);
router.post("/brands/", createBrand);
router.delete("/brands/:id", deleteBrand);
router.get("/resellers/", getAllResellers);
router.post("/resellers/", createReseller);
router.get("/resellers/:id", getReseller);
router.delete("/resellers/:id", deleteReseller);

export default router;
