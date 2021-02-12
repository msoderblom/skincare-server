import Thread from "../models/Thread.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createThread = async (req, res, next) => {
  // test6
  //6024107a587be7a55c397db3

  const { title, body } = req.body;
  if (!title || !body) {
    return next(new ErrorResponse("", 400));
  }

  try {
    const thread = await Thread.create({
      title,
      body,
      user_id: "6024107a587be7a55c397db3",
    });

    res.status(201).json({
      success: true,
      thread,
    });
  } catch (error) {
    next(error);
  }
};