import { addToCart, fatchcart } from "../controller/cart.controller.js";
import express from "express";
const router = express.Router();
router.post("/addToCart",addToCart);
router.get("/:userid",fatchcart);
export default router;