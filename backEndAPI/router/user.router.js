import { createuser,authUser,verifyAccount} from "../controller/user.controller.js";
import express from "express";
import { body } from "express-validator";
const router = express.Router();
router.post("/",
   [body("name","name is required").notEmpty(),
    body("name","only alphphate are allow").isAlpha(),
    body("email","email is required").notEmpty(),
    body("email","invalid email").isEmail(),
    body("password","password is requited").notEmpty(),
    body("contact","cantact is required").notEmpty(),
    body("contact","only number allows").isNumeric()],
    createuser);
    router.post("/auth-user",authUser);
    router.post("/verification",verifyAccount);
export default router;