import mongoose from "mongoose";
import Skinfluencer from "../models/Skinfluencer.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getAllSkinfluencers = async (req, res, next) => {
  try {
    const skinfluencers = await Skinfluencer.find();

    res.status(200).json({
      success: true,
      skinfluencers,
    });
  } catch (error) {
    next(error);
  }
};
export const createSkinfluencer = async (req, res, next) => {
  const data = req.body;
  try {
    const existingSkinfluencer = await Skinfluencer.find({ name: data.name });

    if (existingSkinfluencer) {
      return next(
        new ErrorResponse("There's already a skinfluencer with that name", 400)
      );
    }

    const skinfluencer = await Skinfluencer.create(data);

    res.status(200).json({
      success: true,
      skinfluencer,
    });
  } catch (error) {
    next(error);
  }
};
