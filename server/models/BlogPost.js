import mongoose from "mongoose";

const BlogPostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
    published: {
      type: Boolean,
      default: true,
    },
    publishDate: {
      type: Date,
      default: new Date(),
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
    featureImage: {
      type: String,
    },
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
