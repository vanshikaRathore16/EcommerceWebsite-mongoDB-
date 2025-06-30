import express from "express";
import mongoose from "mongoose";
import user  from "./router/user.router.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./router/product.router.js";
const app = express();
const atlas_url = process.env.ATLAS_URL 
mongoose.connect(atlas_url)
.then(result=>{
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended : true}));
   app.use(cookieParser());
   app.use(express.static("public"));
   app.use("/user",user);
   app.use("/product",productRouter);
   app.listen(process.env.PORT,()=>{
    console.log("server cannected to atlas")
   })
})
.catch(err=>{
    console.log(err );
     console.log("connection failed");
    // return response.status(500).json({err : "internal server error"});
})