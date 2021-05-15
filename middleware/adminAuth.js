import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import ErrorResponse from "../utils/errorResponse.js";

const adminAuth = async (req, res, next) => {
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
    const admin = await Admin.findById(decodedData.id);

    // If no user was found, the token wasn't valid
    if (!admin) {
      return next(
        new ErrorResponse("Token not valid. No admin found with this id.", 404)
      );
    }

    // Add the admin to the request
    req.user = admin;

    // calls next to pass the action
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

export default adminAuth;
