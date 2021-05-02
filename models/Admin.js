import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AdminSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    title: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminRole",
      required: [true, "Please provide a role id"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// When the select propterty is set to false, whenever we query for a user the password is not returned.
// Unless we ask for the password in the query

// Middleware that runs before a user is saved
AdminSchema.pre("save", async function (next) {
  // if the password isn't modified, it will not hash it again and call next()
  if (!this.isModified("password")) {
    next();
  }

  // Salt (Salt length to generate or salt to use)
  // which is the level of difficulty you want to use to hash the password
  const salt = await bcrypt.genSalt(12);

  // Hash the password with bcrypt
  this.password = await bcrypt.hash(this.password, salt);

  // save the user with the hashed password
  next();
});

// Method for checking if the password is correct when signing in
// The password parameter is the password that the user provided from the frontend
AdminSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method for generating a jsonwebtoken
AdminSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;