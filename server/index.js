import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import upload from './config/storage.js' 

import AdminRoutes from "./routes/admin.js";
import ProductRoutes from "./routes/product.js";
import ClientRoutes from "./routes/client.js";
import OrderRoutes from "./routes/order.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.post("/upload", upload.array("photos"), async (req, res) => {
  try {
    const uploadedImages = req.files.map((file) => file.path);
    res.status(200).json({
      message: "Изображения успешно загружены!",
      photos: uploadedImages,
    });
    console.log("Successfully uploaded images to Cloudinary");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Yuklashda xatolik yuz berdi" });
  }
});



app.get("/", (_, res) => res.send("Hello world!"));
app.use("/admin", AdminRoutes);
app.use("/client", ClientRoutes);
app.use("/product", ProductRoutes);
app.use("/order", OrderRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () =>
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startApp();
