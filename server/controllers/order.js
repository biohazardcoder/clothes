import Order from "../models/order.js";
import Product from "../models/product.js";
import Client from "../models/client.js";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const AllOrders = async (_, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ data: orders });
  } catch (error) {
    sendErrorResponse(res, 500, "Server error!");
  }
};

export const GetOneOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = Order.findById(id);
    return res.status(200).json({ data: order });
  } catch (error) {
    sendErrorResponse(res, 500, "Server error!");
  }
};


export const NewOrder = async (req, res) => {
  try {
    const { customer, products, quantity, status } = req.body;

    // Check for missing fields
    if (!customer || !products || !quantity || !status) {
      return sendErrorResponse(res, 400, "All fields are required!");
    }

    // Check if products and quantity arrays have the same length
    if (products.length !== quantity.length) {
      return sendErrorResponse(res, 400, "Products and quantity arrays must have the same length!");
    }

    // Find the client
    const client = await Client.findById(customer);
    if (!client) {
      return sendErrorResponse(res, 404, "Client not found!");
    }

    let totalPrice = 0;
    const updatedProducts = [];

    // Process each product
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(products[i]);
      if (!product) {
        return sendErrorResponse(res, 404, `Product not found with id: ${products[i]}`);
      }

      // Check if stock is sufficient
      if (product.stock < quantity[i]) {
        return sendErrorResponse(res, 400, `Not enough stock for product: ${product.title}`);
      }

      // Update stock and calculate price
      product.stock -= quantity[i];
      await product.save();

      totalPrice += product.price * quantity[i];

      // Store product with quantity
      updatedProducts.push({
        productId: product._id,
        quantity: quantity[i]
      });
    }

    // Create new order
    const newOrder = new Order({
      customer,
      products: updatedProducts, // Products should now contain { productId, quantity }
      status,
      totalPrice: totalPrice.toFixed(2), // Ensure two decimal places
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Optionally add the ordered products to client's products
    client.products.push(...updatedProducts.map(item => item.productId));
    await client.save();

    res.status(201).json({
      message: "Order successfully created",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    sendErrorResponse(res, 500, "Server error!");
  }
};





export const CancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const canceledOrder = await Order.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ data: canceledOrder, message: "Order has been canceled" });
  } catch (error) {
    sendErrorResponse(res, 500, "Server error!");
  }
};
