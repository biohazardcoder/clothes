import Partner from "../models/partner.js";
import Product from "../models/product.js";

const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

export const CreateNewPartner = async (req, res) => {
    try {
        const newPartner = new Partner(req.body);
        await newPartner.save();

        return res
            .status(201)
            .json({ message: "Partner created successfully", partner: newPartner });
    } catch (error) {
        return sendErrorResponse(res, 500, "salom");
    }
};
export const GetAllPartners = async (_, res) => {
    try {
        const Partners = await Partner.find();
        if (Partners.length === 0) {
            return sendErrorResponse(res, 404, "No Partners found.");
        }
        return res.status(200).json({ data: Partners });
    } catch (error) {
        return sendErrorResponse(res, 500, "Internal server error.");
    }
};

export const DeletePartner = async (req, res) => {
    const { id } = req.params;
    try {
        const deletePartner = await Partner.findByIdAndDelete(id);
        if (!deletePartner) {
            return sendErrorResponse(res, 404, "Partner not found.");
        }
        return res
            .status(201)
            .json({ message: "Partner has been deleted successfully." });
    } catch (error) {
        return sendErrorResponse(res, 500, "Internal server error.");
    }
};

export const UpdatePartner = async (req, res) => {
    const PartnerId = req.params.id;

    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return sendErrorResponse(res, 400, "No update data provided.");
        }

        let updatedPartner;
        if (req.body.products) {
            const partner = await Partner.findById(PartnerId);
            if (!partner) {
                return sendErrorResponse(res, 404, "Partner not found.");
            }

            const updatedProducts = req.body.products;
            updatedProducts.forEach(async (prod) => {
                const product = await Product.findById(prod.productId);
                if (!product) {
                    return sendErrorResponse(res, 400, `Product with ID ${prod.productId} does not exist.`);
                }

                if (product.stock < prod.quantity) {
                    return sendErrorResponse(res, 400, `Not enough stock for product ${product.title}`);
                }
                product.stock -= prod.quantity;
                await product.save();

                const existingProduct = partner.products.find(
                    (p) => p.productId.toString() === prod.productId
                );

                if (existingProduct) {
                    existingProduct.purchasedQuantity += prod.quantity;
                } else {
                    partner.products.push({
                        productId: prod.productId,
                        purchasedQuantity: prod.quantity,
                    });
                }
            });

            updatedPartner = await partner.save();
        } else {
            updatedPartner = await Partner.findByIdAndUpdate(PartnerId, req.body, {
                new: true,
            });
        }

        if (!updatedPartner) {
            return sendErrorResponse(res, 409, "Partner not found.");
        }

        return res.status(200).json({
            message: "Partner updated successfully",
            data: updatedPartner,
        });
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, "Internal server error.");
    }
};


export const GetOnePartner = async (req, res) => {
    const PartnerId = req.params.id;
    try {
        const onePartner = await Partner.findById(PartnerId)
            .populate("products", "title price stock")
            .exec();

        if (!onePartner) {
            return sendErrorResponse(res, 404, "Partner not found.");
        }

        // Now, map through products and add stock information to the response
        const productsWithStock = onePartner.products.map(product => ({
            productId: product._id,
            title: product.title,
            price: product.price,
            stock: product.stock
        }));

        // Respond with the partner details and the products with stock
        return res.status(200).json({
            data: {
                ...onePartner.toObject(),
                products: productsWithStock
            }
        });
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, "Internal server error.");
    }
};


export const AddProductToPartner = async (req, res) => {
    const { id: partnerId } = req.params;
    const { products } = req.body;

    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return sendErrorResponse(res, 404, "Partner not found.");
        }

        const productIds = products.map((product) => product.productId);

        const validProducts = await Product.find({ _id: { $in: productIds } });

        if (validProducts.length !== products.length) {
            return sendErrorResponse(res, 400, "One or more products are invalid.");
        }

        for (const product of products) {
            const validProduct = validProducts.find(p => p._id.toString() === product.productId);

            if (!validProduct) {
                return sendErrorResponse(res, 400, `Product with ID ${product.productId} is invalid.`);
            }

            if (validProduct.stock < product.quantity) {
                return sendErrorResponse(res, 400, `Not enough stock for product ${validProduct.title}`);
            }

            validProduct.stock -= product.quantity;

            await validProduct.save();

            const existingProduct = partner.products.find(p => p.productId && p.productId.toString() === validProduct._id.toString());

            if (existingProduct) {
                existingProduct.purchasedQuantity += product.quantity;
            } else {
                partner.products.push({
                    productId: validProduct._id,
                    purchasedQuantity: product.quantity
                });
            }
        }

        await partner.save();

        return res.status(200).json({ message: "Products added to partner successfully", partner });
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, "Internal server error.");
    }

};


export const EditProductInPartner = async (req, res) => {
    const { partnerId, productId } = req.params;
    const { newQuantity } = req.body;

    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) return sendErrorResponse(res, 404, "Partner not found.");

        const product = await Product.findById(productId);
        if (!product) return sendErrorResponse(res, 404, "Product not found.");

        const existingProduct = partner.products.find(
            (p) => p.productId.toString() === productId
        );

        if (!existingProduct) {
            return sendErrorResponse(res, 404, "Product not found in partner.");
        }

        const quantityDifference = newQuantity - existingProduct.purchasedQuantity;

        if (quantityDifference > 0 && product.stock < quantityDifference) {
            return sendErrorResponse(res, 400, "Insufficient stock.");
        }

        existingProduct.purchasedQuantity = newQuantity;
        product.stock -= quantityDifference;
        await product.save();
        await partner.save();

        return res.status(200).json({ message: "Product quantity updated successfully." });
    } catch (error) {
        return sendErrorResponse(res, 500, "Internal server error.");
    }
};

export const DeleteProductFromPartner = async (req, res) => {
    const { partnerId, productId } = req.params;

    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) return sendErrorResponse(res, 404, "Partner not found.");

        const product = await Product.findById(productId);
        if (!product) return sendErrorResponse(res, 404, "Product not found.");

        const productIndex = partner.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (productIndex === -1) {
            return sendErrorResponse(res, 404, "Product not found in partner.");
        }

        const purchasedQuantity = partner.products[productIndex].purchasedQuantity;
        product.stock += purchasedQuantity;

        partner.products.splice(productIndex, 1);

        await product.save();
        await partner.save();

        return res.status(200).json({ message: "Product removed from partner successfully." });
    } catch (error) {
        return sendErrorResponse(res, 500, "Internal server error.");
    }
};
