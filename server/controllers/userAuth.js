import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

export const signUp = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(
        new ErrorResponse("There's already a user with that email", 400)
      );
    }

    if (password !== confirmPassword) {
      return next(new ErrorResponse("Passwords don't match", 400));
    }

    // creating a new user
    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
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
