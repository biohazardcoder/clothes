import exress from "express";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";
import {
  AllOrders,
  CancelOrder,
  GetOneOrder,
  NewOrder,
} from "../controllers/order.js";

const router = exress.Router();

router.get("/", AllOrders);
router.get("/:id", GetOneOrder);
router.post("/new-order", isExisted, NewOrder);
router.delete("/:id", isExisted, CancelOrder);

export default router;
