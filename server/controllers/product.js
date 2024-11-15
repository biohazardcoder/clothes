import Product from "../models/product.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const CreateNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    const { title, category, pageNum, pageSize } = req.query;
    const titleRegExp = new RegExp(title, "i");
    const categoryRegExp = new RegExp(category, "i");

    const total = await Product.countDocuments({
      title: titleRegExp,
      category: categoryRegExp,
    });

    const products = await Product.find({
      title: titleRegExp,
      category: categoryRegExp,
    })
      .skip((pageNum - 1) * pageSize)
      .limit(parseInt(pageSize));

    return res.status(200).json({ data: products, total });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found.");
    }

    if (product.photos && product.photos.length > 0) {
      product.photos.forEach((photo) => {
        const slicedPhoto = photo.slice(29);
        const filePath = path.join(__dirname, "..", "uploads", slicedPhoto);
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          } else {
            console.warn(`File not found: ${filePath}`);
          }
        } catch (err) {
          console.error(`Failed to delete image: ${filePath}`, err);
        }
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log("Product and associated images have been deleted successfully.")

    return res.status(201).json({
      message: "Product and associated images have been deleted successfully.",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const UpdateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      return sendErrorResponse(res, 409, "Product not found.");
    }
    return res.status(201).json({ data: product });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const GetOneProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const oneProduct = await Product.findById(productId);
    if (!oneProduct) {
      return sendErrorResponse(res, 409, "Product not found.");
    }
    return res.status(201).json({ data: oneProduct });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};
export const GetProductsByIds = async (req, res) => {
  const productIds = req.body.ids;
  try {
    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (!products || products.length === 0) {
      return sendErrorResponse(res, 404, "Products not found.");
    }

    return res.status(200).json({ data: products });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};



