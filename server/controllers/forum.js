import mongoose from "mongoose";
import Thread from "../models/Thread.js";
import Comment from "../models/Comment.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createThread = async (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return next(new ErrorResponse("Please provide a title and body", 400));
  }

  try {
    const thread = await Thread.create({
      title,
      body,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      thread,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllThreads = async (req, res, next) => {
  try {
    let query = Thread.find(); // returns a promise

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 50;

    // calculate which threads to get, how many documents to skip to get the docs we want

    const skip = (page - 1) * pageSize;
    const total = await Thread.countDocuments(); // Check how many threads there are in the database

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

    const result = await query.populate("author");

    res.status(200).json({
      success: true,
      count: result.length,
      page,
      pages,
      threads: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  const { id: threadID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadID)) {
    return next(new ErrorResponse("No thread with that id", 404));
  }

  const { content } = req.body;
  if (!content) {
    return next(new ErrorResponse("Please provide content", 400));
  }

  try {
    const comment = await Comment.create({
      thread: threadID,
      content,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(error);
  }
};
