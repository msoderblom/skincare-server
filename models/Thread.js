import mongoose from "mongoose";

const ThreadSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    body: {
      type: String,
      required: [true, "Please provide a body"],
    },
    likes: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

const Thread = mongoose.model("Thread", ThreadSchema);

export default Thread;
