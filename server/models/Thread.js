import mongoose from "mongoose";

const ThreadSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
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
