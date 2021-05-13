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
export const getThread = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Please provide a valid id", 404));
  }
  try {
    const thread = await Thread.findById(id).populate("author");

    if (!thread) {
      return next(new ErrorResponse("There's no thread with this id", 404));
    }

    res.status(200).json({
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

    const result = await query.populate("author").lean();

    // TODO: see if you can rewrite the addCommentsCount to this
    /*   const flavors = await Promise.all(
         createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    ); */

    const addCommentsCount = async (threadArr) => {
      for (let index = 0; index < threadArr.length; index++) {
        threadArr[index].commentsCount = await Comment.countDocuments({
          thread: threadArr[index]._id,
        });
      }
      return threadArr;
    };

    const threads = await addCommentsCount(result);

    res.status(200).json({
      success: true,
      count: result.length,
      totalThreads: total,
      page,
      pages,
      threads,
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  const { id: threadID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadID)) {
    return next(new ErrorResponse("Please provide a valid thread id", 404));
  }

  const { content } = req.body;
  if (!content) {
    return next(new ErrorResponse("Please provide content", 400));
  }

  try {
    const thread = await Thread.findById(threadID);

    if (!thread) {
      return next(new ErrorResponse("There's no thread with this id", 404));
    }

    let comment = await Comment.create({
      thread: threadID,
      content,
      author: req.user._id,
    });

    comment = await comment.populate("author").execPopulate();

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const replyToComment = async (req, res, next) => {
  const { id: threadID, commentid: parentCommentID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadID)) {
    return next(new ErrorResponse("Please provide a valid thread id", 404));
  }
  if (!mongoose.Types.ObjectId.isValid(parentCommentID)) {
    return next(new ErrorResponse("Please provide a valid comment id", 404));
  }

  const { content } = req.body;

  if (!content) {
    return next(new ErrorResponse("Please provide content", 400));
  }

  try {
    const thread = await Thread.findById(threadID);

    if (!thread) {
      return next(new ErrorResponse("There's no thread with this id", 404));
    }

    const parentComment = await Comment.findById(parentCommentID);

    if (!parentComment) {
      return next(new ErrorResponse("There's no comment with this id", 404));
    }

    let comment = await Comment.create({
      thread: threadID,
      content,
      author: req.user._id,
      level: parentComment.level + 1,
    });

    await parentComment.updateOne({
      children: [...parentComment.children, comment._id],
    });

    const updatedParentComment = await Comment.findById(
      parentCommentID
    ).populate("author");

    comment = await comment.populate("author").execPopulate();

    res.status(201).json({
      success: true,
      comment,
      updatedParentComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getThreadComments = async (req, res, next) => {
  const { id: threadID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadID)) {
    return next(new ErrorResponse("Please provide a valid thread id", 404));
  }

  try {
    const thread = await Thread.findById(threadID);

    if (!thread) {
      return next(new ErrorResponse("There's no thread with this id", 404));
    }

    const comments = await Comment.find({ thread: threadID }).populate(
      "author"
    );

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const likeThread = async (req, res, next) => {
  const { id } = req.params;

  // check if id is a mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Please provide a valid thread id", 404));
  }

  try {
    const thread = await Thread.findById(id);

    if (!thread) {
      return next(new ErrorResponse("There's no thread with this id", 404));
    }

    // see if the users id is already in the likes array
    const index = thread.likes.findIndex((id) => id === String(req.user._id));

    // if the user haven't already liked the post the index will be -1
    if (index === -1) {
      // like the post
      thread.likes.push(req.user._id);
    } else {
      // if we have the index of the users like, we will dislike the post
      // remove the id from the array
      thread.likes = thread.likes.filter((id) => id !== String(req.user._id));
    }

    await Thread.updateOne({ _id: id }, thread, { runValidators: true });
    const updatedThread = await Thread.findById(id).populate("author");

    // const updatedThread = await Thread.findByIdAndUpdate(id, thread, {
    //   new: true,
    //   runValidators: true,
    // });

    res.status(200).json({
      success: true,
      updatedThread,
    });
  } catch (error) {
    next(error);
  }
};
