import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["product", "category"],
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
