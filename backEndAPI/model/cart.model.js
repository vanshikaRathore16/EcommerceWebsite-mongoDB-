import mongoose from "mongoose";
const cartschema = new mongoose.Schema({
    userid:{
      type : mongoose.Schema.Types.ObjectId,
      ref : "user"
    },
    cartItem:[{
        productId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    }
    }]
})
export const Cart = mongoose.model("cart",cartschema);