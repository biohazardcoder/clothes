import express from "express";
import {
    CreateNewPartner,
    DeletePartner,
    GetAllPartners,
    GetOnePartner,
    UpdatePartner,
    AddProductToPartner,
    EditProductInPartner,
    DeleteProductFromPartner
} from "../controllers/partners.js";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";

const router = express.Router();

router.get("/", GetAllPartners);
router.get("/:id", GetOnePartner);
router.post("/create", isExisted, IsAdmin, CreateNewPartner);
router.delete("/:id", isExisted, DeletePartner);
router.put("/:id", isExisted, UpdatePartner);
router.post("/:id/add-products", isExisted, IsAdmin, AddProductToPartner);
router.put("/:partnerId/products/:productId", isExisted, IsAdmin, EditProductInPartner);
router.delete("/:partnerId/products/:productId", isExisted, IsAdmin, DeleteProductFromPartner);


export default router;
