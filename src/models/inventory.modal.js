import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },
    sizeNumber: {
      type: Number,
      required: true,
      enum: [28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

inventorySchema.index(
  { productId: 1, branchId: 1, sizeNumber: 1 },
  { unique: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
