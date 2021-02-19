import mongoose from "mongoose";

const ResellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
    },
    link: {
      linkName: {
        type: String,
      },
      url: {
        type: String,
        required: [true, "Please provide an url"],
        match: [
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
          "Please provide a valid link/url",
        ],
      },
    },
  },
  {
    timestamps: true, // skapar automatiskt fält för när den skapades och uppdaterades
  }
);

const Reseller = mongoose.model("Reseller", ResellerSchema);

export default Reseller;
