import { createuser,authUser,verifyAccount,list,createProfile} from "../controller/user.controller.js";
import express from "express";
import { body } from "express-validator";
import multer from "multer";
const router = express.Router();
const upload = multer({dest : "public/profile"});
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
    router.get("/list",list);
    router.patch("/profile/:userId",upload.single("imageName"),createProfile);
export default router;
// router.patch("/profile/:userId",upload.single("imageName"),createProfile);
// const upload = multer({dest: "public/profile"});