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

export const getSkinfluencer = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new ErrorResponse("Not a valid mongoose object id", 404));
  }

  try {
    const skinfluencer = await Skinfluencer.findById(id);

    if (!skinfluencer) {
      return next(
        new ErrorResponse("No skinfluencer with that id was found", 404)
      );
    }

    res.status(200).json({
      success: true,
      skinfluencer,
    });
  } catch (error) {
    next(error);
  }
};

export const createSkinfluencer = async (req, res, next) => {
  const data = req.body;
  try {
    const existingSkinfluencer = await Skinfluencer.findOne({
      name: data.name,
    });

    if (existingSkinfluencer) {
      return next(
        new ErrorResponse("There's already a skinfluencer with that name", 400)
      );
    }

    const skinfluencer = await Skinfluencer.create(data);

    res.status(201).json({
      success: true,
      skinfluencer,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkinfluencer = async (req, res, next) => {
  const { id } = req.params;

  // check if _id is a mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Not a valid mongoose object id", 404));
  }

  try {
    const skinfluencer = await Skinfluencer.findById(id);

    if (!skinfluencer) {
      return next(
        new ErrorResponse("No skinfluencer with that id was found", 404)
      );
    }

    await Skinfluencer.deleteOne({ _id: id });

    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const updateSkinfluencer = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return next(new ErrorResponse("Not a valid mongoose object id", 404));
  }

  try {
    const skinfluencer = await Skinfluencer.findById(id);

    if (!skinfluencer) {
      return next(
        new ErrorResponse("No skinfluencer with that id was found", 404)
      );
    }

    await Skinfluencer.updateOne(
      { _id: id },
      { ...data },
      { runValidators: true }
    );

    const updatedSkinfluencer = await Skinfluencer.findById(id);

    res.status(200).json({
      success: true,
      updatedSkinfluencer,
    });
  } catch (error) {
    next(error);
  }
};
