import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
// register

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // creating a new user
    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);

    /* res.status(500).json({
      success: false,
      error: error.message,
    }); */
  }
};

// login
export const signIn = async (req, res) => {
  res.send("Sign in route");

  /*   // Check if email and password is provided
   if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  } */
};
// forgotPassword
// resetPassword
