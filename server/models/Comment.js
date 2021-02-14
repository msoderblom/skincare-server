import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
    content: {
      type: String,
      required: [true, "Please provide content "],
    },
    likes: {
      type: [String],
      default: [],
    },
    level: {
      type: Number,
      default: 1,
    },
    children: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
