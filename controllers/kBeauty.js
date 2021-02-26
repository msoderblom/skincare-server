import mongoose from "mongoose";
import Reseller from "../models/Reseller.js";
import Brand from "../models/Brand.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getAllBrands = async (req, res, next) => {
  /*   try {
    const skinfluencers = await Skinfluencer.find();

    res.status(200).json({
      success: true,
      skinfluencers,
    });
  } catch (error) {
    next(error);
  } */
};
export const createBrand = async (req, res, next) => {
  const data = req.body;
  try {
    const existingBrand = await Brand.findOne({ name: data.name });

    if (existingBrand) {
      return next(
        new ErrorResponse(
          `There's already a brand with the name "${data.name}"`,
          400
        )
      );
    }

    const brand = await Brand.create(data);

    res.status(201).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllResellers = async (req, res, next) => {};

export const createReseller = async (req, res, next) => {
  const data = req.body;

  if (!data.name) {
    return next(new ErrorResponse("Please provide a name", 400));
  }

  try {
    const existingReseller = await Reseller.findOne({ name: data.name });

    if (existingReseller) {
      return next(
        new ErrorResponse("There's already a reseller with that name", 400)
      );
    }

    const reseller = await Reseller.create(data);

    res.status(201).json({
      success: true,
      reseller,
    });
  } catch (error) {
    next(error);
  }
};
