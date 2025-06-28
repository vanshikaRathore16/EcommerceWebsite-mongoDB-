import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    contact:{
        type : String,
        isNumeric : true,
        required : true
    },
    profile:{
         imageName : String,
         address : String
    },
    isverified:{
       type : Boolean,
       default : false
    }
});
export const User = mongoose.model("user",userSchema);
