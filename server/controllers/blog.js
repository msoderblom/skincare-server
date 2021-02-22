import mongoose from "mongoose";
import BlogPost from "../models/BlogPost.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createPost = async (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return next(new ErrorResponse("Please provide a title and body", 400));
  }

  try {
    const blogPost = await BlogPost.create({
      title,
      body,
      author: "Admin",
    });

    res.status(201).json({
      success: true,
      blogPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Please provide a valid id", 404));
  }
  try {
    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return next(new ErrorResponse("There's no blog post with this id", 404));
    }

    res.status(200).json({
      success: true,
      post: blogPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    let query = BlogPost.find({ published: true }); // returns a promise

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 50;

    // calculate which threads to get, how many documents to skip to get the docs we want

    const skip = (page - 1) * pageSize;
    const total = await BlogPost.countDocuments(); // Check how many posts there are in the database

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

    res.status(200).json({
      success: true,
      count: result.length,
      totalPosts: total,
      page,
      pages,
      blogPosts: result,
    });
  } catch (error) {
    next(error);
  }
};
