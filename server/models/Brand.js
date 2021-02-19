import mongoose from "mongoose";
import slugify from "slugify";

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    isKBeauty: {
      type: Boolean,
      default: true,
    },
    resellers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reseller",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

BrandSchema.pre("save", async function (next) {
  this.slug = slugify(this.name);
  next();
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;
