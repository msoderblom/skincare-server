import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getAllUsers = async (req, res, next) => {
  try {
    let query = User.find(); // returns a promise

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 50;

    // calculate which threads to get, how many documents to skip to get the docs we want

    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments(); // Check how many users there are in the database

    // how many pages do we have (500/50 = 10)
    const pages = Math.ceil(total / pageSize);

    // skip() takes an argument of how many documents to skip
    // limit() takes an argument of how many documents to get after the skip
    query = query.sort({ createdAt: "desc" }).skip(skip).limit(pageSize);

    // If the page is 11 and we have 10 total pages, throw error
    if (page > pages) {
      // have to add return so the nodemon server doesn't crash'
      return next(new ErrorResponse("No page found", 404));
    }

    const result = await query;

    res.status(201).json({
      success: true,
      count: result.length,
      totalUsers: total,
      page,
      pages,
      users: result,
    });
  } catch (error) {
    next(error);
  }
};
