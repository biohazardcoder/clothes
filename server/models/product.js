import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  stock: { type: Number, required: true },
  size: { type: String, required: true },
  photos: [{ type: String, required: true }],
});

ProductSchema.virtual("total").get(function () {
  return this.price * this.stock;
});

ProductSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Product", ProductSchema);
