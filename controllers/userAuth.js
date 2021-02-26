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
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    // Check if the user exists
    if (!user) {
      // 404 means the user can't be found in the db
      return next(
        new ErrorResponse("Invalid credentials. This user doesn't exist. ", 404)
      );
    }

    // Check if the correct password is provided
    const isPasswordMatch = await user.matchPasswords(password);

    // If passwords do not match, throw error
    if (!isPasswordMatch) {
      return next(new ErrorResponse("Invalid password.", 404));
    }

    const userResponse = {
      username: user.username,
      email: user.email,
      _id: user._id,
    };

    const token = user.getSignedToken();

    res.status(200).json({
      success: true,
      user: userResponse,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// forgotPassword
// resetPassword
