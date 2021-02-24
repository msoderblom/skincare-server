import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
