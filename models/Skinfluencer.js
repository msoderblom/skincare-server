import mongoose from "mongoose";

const SkinfluencerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
    },
    image: {
      type: String,
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "Please provide a valid image url",
      ],
    },
    about: {
      type: String,
      required: [
        true,
        'Please provide "about", a description of the skinfluencer.',
      ],
    },
    title: {
      type: String,
      default: null,
    },
    hasProfessionalTitle: {
      type: Boolean,
      default: false,
    },
    socialLinks: [
      {
        platform: {
          type: String,
          enum: [
            "instagram",
            "twitter",
            "facebook",
            "youtube",
            "tiktok",
            "website",
            "blog",
          ],
          required: [true, "Please provide a platform"],
        },
        linkName: {
          type: String,
        },
        url: {
          type: String,
          match: [
            /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
            "Please provide a valid link/url",
          ],
        },
      },
    ],
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

const Skinfluencer = mongoose.model("Skinfluencer", SkinfluencerSchema);

export default Skinfluencer;

// TODO: maybe add location, so you can find the ones that live in Sweden. Or a livesInSweden key
