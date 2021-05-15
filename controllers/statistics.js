import Thread from "../models/Thread.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import mongoose from "mongoose";
import moment from "moment";

export const getStatistics = async (req, res, next) => {
  // const today = new Date();
  // const thisYear = today.getFullYear();
  // const thisMonth = today.getMonth();

  try {
    const totalThreads = await Thread.countDocuments();
    const totalUsers = await User.countDocuments();
    const newUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: moment().startOf("month"),
        $lte: moment().endOf("month"),
      },
    });

    res.status(200).json({
      success: true,
      totalThreads,
      totalUsers,
      newUsersThisMonth,
    });
  } catch (error) {
    next(error);
  }
};
