import { request, response } from "express";
import { Cart } from "../model/cart.model.js";
import mongoose from "mongoose";

export const addToCart = async(request,response,next)=>{
    try{
      let {userid,productId} = request.body;
      const objectUserId = new mongoose.Types.ObjectId(userid);
      const cart  = await Cart.findOne({userid});
      if(cart){
        let status = cart.cartItem.some((item)=>{return item.productId == productId});
    if(status)
        return response.status(200).json({message : "item alraedy added in cart"});
         cart.cartItem.push({productId});
         await cart.save();
         return response.status(200).json({message : "product added in cart"});
    }else{
       let cart = await Cart.create({userid,cartItem:[{productId}]});
       return response.status(200).json({mesagge : "cart create and product added"});
    }

    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

export const fatchcart = async(request,response,next)=>{
    try{
         let {userid } = request.params;
         const objectUserId = new mongoose.Types.ObjectId(userid);
         console.log(userid);
         const product = await Cart.findOne({userid : objectUserId}).populate("cartItem.productId").populate("userid");
         console.log(product);
         console.log(userid);
         return response .status(200).json({message:product});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal sever error"});
    }
}