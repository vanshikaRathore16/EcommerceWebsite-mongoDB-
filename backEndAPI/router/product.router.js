import express from "express";
import { searchProduct,fatchProduct, saveInBulk ,list} from "../controller/product.controller.js";
let router = express.Router();
router.post("/bulk-create",saveInBulk);
router.get("/list",list);
router.get("/search",searchProduct);
router.get("/:id",fatchProduct)
export default router;