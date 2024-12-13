import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
      title: { type: String, required: true },
      color: { type: String, required: true },
      size: { type: String, required: true },
    },
  ],
  status: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;