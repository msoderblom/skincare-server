import mongoose from "mongoose";

const AdminRoleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the role's title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description of the role"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

const AdminRole = mongoose.model("AdminRole", AdminRoleSchema);

export default AdminRole;
