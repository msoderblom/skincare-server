import mongoose from "mongoose";

const BlogPostSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Please provide an author"],
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
    images: {
      type: [
        {
          fieldname: String,
          originalname: String,
          encoding: String,
          mimetype: String,
          destination: String,
          filename: String,
          path: String,
          size: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
