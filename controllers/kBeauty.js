import mongoose from "mongoose";
import Reseller from "../models/Reseller.js";
import Brand from "../models/Brand.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getAllBrands = async (req, res, next) => {
  const getResellers = Boolean(req.query.resellers) || false;

  try {
    let brands;

    if (getResellers) {
      brands = await Brand.find().populate("resellers");
    } else {
      brands = await Brand.find();
    }

    res.status(200).json({
      success: true,
      brands,
    });
  } catch (error) {
    next(error);
  }
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
export const deleteBrand = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new ErrorResponse("Not a valid mongoose object id", 404));
  }

  try {
    const brand = await Brand.findById(id);

    if (!brand) {
      return next(new ErrorResponse("No brand with that id was found", 404));
    }

    await Brand.deleteOne({ _id: id });

    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteReseller = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new ErrorResponse("Not a valid mongoose object id", 404));
  }

  try {
    const reseller = await Reseller.findById(id);

    if (!reseller) {
      return next(new ErrorResponse("No reseller with that id was found", 404));
    }

    const brandsContainingReseller = await Brand.find({ resellers: id });

    // TODO: Maybe delete/update resellers in brands in a better way?
    if (brandsContainingReseller.length > 0) {
      brandsContainingReseller.forEach(async (brand) => {
        const updatedResellers = brand.resellers.filter(
          (resellerID) => String(resellerID) !== id
        );

        await Brand.updateOne(
          { _id: brand._id },
          { resellers: updatedResellers }
        );
      });
    }

    await Reseller.deleteOne({ _id: id });

    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllResellers = async (req, res, next) => {
  try {
    const resellers = await Reseller.find();

    res.status(200).json({
      success: true,
      resellers,
    });
  } catch (error) {
    next(error);
  }
};

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
