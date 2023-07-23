import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: -1, //index in descending order || 1 means ascending order
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema); //categorys
