import User from "../models/User.js";

// register

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // creating a new user
    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// login
export const signIn = async (req, res) => {
  res.send("Sign in route");
};
// forgotPassword
// resetPassword
