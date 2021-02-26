import ErrorResponse from "../utils/errorResponse.js";

const validateBodyData = (req, res, next) => {
  console.log("Body: ", req.body);
  if (!req.body.title || !req.body.title) {
    return next(
      new ErrorResponse("Please provide a title and body from validate", 400)
    );
  } else {
    next();
  }
};

export default validateBodyData;
