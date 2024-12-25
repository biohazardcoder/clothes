import Order from "../models/order.js";
import Product from "../models/product.js";
import Client from "../models/client.js";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const AllOrders = async (_, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .populate({
        path: "customer",
        model: "Client",
      });


    return res.status(200).json({ data: orders });
  } catch (error) {
    sendErrorResponse(res, 500, "Serverdagi ichki xatolik.");

  }
};

export const GetOneOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = Order.findById(id);
    return res.status(200).json({ data: order });
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};


export const NewOrder = async (req, res) => {
  try {
    const { customer, products, status } = req.body;

    if (!customer || !products || !status) {
      return res.status(400).json({ message: "Barcha maydonlarni kiritish shart!" });
    }

    let totalPrice = 0;
    const updatedProducts = await Promise.all(
      products.map(async ({ productId, quantity, color, size }) => {
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error(`Mahsulot id bilan topilmadi: ${productId}`);
        }

        if (product.stock < quantity) {
          throw new Error(`Mahsulot uchun zaxira yetarli emas: ${product.title}`);
        }

        product.stock -= quantity;
        await product.save();

        totalPrice += product.price * quantity;

        return {
          productId: product._id,
          quantity,
          color: color || 'white',
          size: size || 'M',
          title: product.title,
        };

      })
    );

    const newOrder = new Order({
      customer,
      products: updatedProducts,
      status,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    const client = await Client.findById(customer);
    if (!client) {
      return res.status(404).json({ message: "Mijoz topilmadi!" });
    }

    client.orders.push(savedOrder._id);
    await client.save();

    res.status(201).json({
      message: "Buyurtma muvaffaqiyatli yaratildi",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Buyurtma yaratishda xatolik yuz berdi:", error.message);
    res.status(500).json({ message: error.message });
  }
};




export const CancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const canceledOrder = await Order.findByIdAndUpdate(
      id,
      { status: "Bekor qilingan" },
      { new: true }
    );

    if (!canceledOrder) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }

    for (const product of canceledOrder.products) {
      await Product.findByIdAndUpdate(
        product.productId,
        { $inc: { stock: product.quantity } },
        { new: true }
      );
    }

    return res
      .status(200)
      .json({ data: canceledOrder, message: "Buyurtma bekor qilindi va mahsulotlar zaxiraga qaytarildi" });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, "Serverdagi ichki xatolik.");
  }
};

export const DeliveryOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const canceledOrder = await Order.findByIdAndUpdate(
      id,
      { status: "Yo'lda" },
      { new: true }
    );

    if (!canceledOrder) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }


    return res
      .status(200)
      .json({ data: canceledOrder, message: "Buyurtma bekor qilindi va mahsulotlar zaxiraga qaytarildi" });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, "Serverdagi ichki xatolik.");
  }
};

export const SuccessOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const canceledOrder = await Order.findByIdAndUpdate(
      id,
      { status: "Yetkazib berilgan" },
      { new: true }
    );

    if (!canceledOrder) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }


    return res
      .status(200)
      .json({ data: canceledOrder, message: "Buyurtma bekor qilindi va mahsulotlar zaxiraga qaytarildi" });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, "Serverdagi ichki xatolik.");
  }
};