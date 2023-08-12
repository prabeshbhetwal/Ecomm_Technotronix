import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
      maxLength: 150,
    },
    parentCat: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    salesPrice: {
      type: Number,
    },
    qty: {
      type: Number,
      required: true,
    },
    salesStartDate: {
      type: Date,
    },
    salesEndDate: {
      type: Date,
    },
    sku: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema); ///products
