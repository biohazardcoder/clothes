import mongoose from "mongoose";

const PartnersSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    photos: [{ type: String }],
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            purchasedQuantity: { type: Number, default: 0 }
        }
    ],
});

export default mongoose.model("Partner", PartnersSchema);
