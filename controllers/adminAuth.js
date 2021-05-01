import Admin from "../models/Admin.js";
import AdminRole from "../models/AdminRole.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createAdminUser = async (req, res, next) => {
  const { password, confirmPassword, email, ...data } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return next(
        new ErrorResponse("There's already an admin user with that email", 400)
      );
    }

    if (password !== confirmPassword) {
      return next(new ErrorResponse("Passwords don't match", 400));
    }

    // creating a new admin user
    const admin = await Admin.create({ ...data, password, email });

    res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdminRole = async (req, res, next) => {
  const data = req.body;

  try {
    const existingRole = await AdminRole.findOne({ title: data.title });

    if (existingRole) {
      return next(
        new ErrorResponse("There's already an admin role with that title", 400)
      );
    }

    // Create a new admin role
    const adminRole = await AdminRole.create(data);

    res.status(201).json({
      success: true,
      adminRole,
    });
  } catch (error) {
    next(error);
  }
};
