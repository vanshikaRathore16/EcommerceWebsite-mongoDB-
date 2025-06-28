import { request, response } from "express";
import { Product } from "../model/product.model.js";
import { query } from "express-validator";
export const saveInBulk = async(request,response,next)=>{
    try{
        const result = await Product.insertMany(request.body);
        return response.status(200).json({message : "product saveed"});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

//  find product

export const list = async(request,response,next)=>{
    try{
      let list = await Product.find();
      return response.status(200).json({productlist : list});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}
export const fatchProduct = async(request,response,next)=>{
    try{
       let { id } = request.params;
       let producr = await Product.findById({_id : id});
       return response.status(200).json({prodycr_details : producr});
    }catch(err){
        return response.status(500).json({err : "internal server error"});
    }
}

export const searchProduct = async(request,response,next)=>{
    try{
        let {title,minPrice,maxPrice,category} = request.query;
        let query = {};
        if(category)
            query.category = {$regex : category,$options : 'i'}
        if(title)
            query.title = {$regex : title, $options : "i"}
        if(minPrice || maxPrice)
            query.prixe = {};
        if(minPrice)
            query.prixe.$gte = minPrice;
        if(maxPrice)
            query.prixe.$lte = maxPrice
        let result = await Product.find(query);
        return response.status(200).json({message : result});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}