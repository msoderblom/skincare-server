import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

const userAuth = async (req, res, next) => {
  let token;

  // check if there's an authorization in header, and if it start with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // split the token from the Bearer
    token = req.headers.authorization.split(" ")[1];
  }

  // if no token was found
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // extracts the email and the id from the token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Try to find a user with the id from the token
    const user = await User.findById(decodedData.id);

    // If no user was found, the token wasn't valid
    if (!user) {
      return next(
        new ErrorResponse("Token not valid. No user found with this id.", 404)
      );
    }

    // Add the user to the request
    req.user = user;

    // calls next to pass the action
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

export default userAuth;
