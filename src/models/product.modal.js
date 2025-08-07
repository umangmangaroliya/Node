import mongoose from "mongoose";
import { required } from "zod/v4-mini";
const sizeSchema = new mongoose.Schema({
  sizeNumber: {
    type: Number,
    enum: [28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48],
    required: true,
  },
  quantity: { type: Number, required: true, min: 0, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      index: true,
    },
    size: [sizeSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
