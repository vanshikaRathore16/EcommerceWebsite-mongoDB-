import { request, response } from "express"
import { User}  from "../model/user.model.js"
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createuser = async(request,response,next)=>{
    const error = validationResult(request)
    try{
    if(!error.isEmpty())
    return response.status(400).json({message : "bad requiset" ,errormessgae : error.array()})
    let { name,email,password,contact} = request.body;
    const seltkey = bcrypt.genSaltSync(12);
    password = bcrypt.hashSync(password,seltkey);
    let result = await User.create({name,email,password,contact});
    await sendEmail(email,name);
    return response.status(200).json({message : "user cretaed", user : result});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

export const verifyAccount = async(request,response,next)=>{
    try{
          let { email } = request.body;
          let result = await User.updateOne({email},{$set:{isverified : true}});
          return response.status(200).json({message : "Account Verified Successfully"});
    }catch(err){
      return response.status(500).json({err : "internal server error "});
    }
}

export const authUser = async(request,response,next)=>{
    try{
      let {email,password} = request.body;
      let user = await User.findOne({email});
      if(!user)
      return response.status(401).json({message : "bad requiset"});
      if(!user.isverified)
      return response.status(400).json({message : "user is not verify"});
      let status = bcrypt.compareSync(password,user.password);
      user.password  = undefined;
      if(status){
        response.cookie("token",generateToken(user.email,user._id,user.contact));
      }
        return status ?  response.status(200).json({message : "log-in successfully",user}) : response.status(400).json({message : "wrog password"}) ;
    }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
}
}



const sendEmail =(email,name)=>{
    return new Promise((resolve,reject)=>{
  let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mongoproject20@gmail.com',
    pass: 'pbrk suoh glle uidp'
  }
});
// http://localhost:3000/user/verification
 
        
let mailOptions = {
  from: 'mongoproject20@gmail.com',
  to: email,
  subject: 'account varification',
  html: `<h4>dear ${name}</h4>
  <p>thank you for verification plaese click on below line</p>
  <form method ='post' action = 'http://localhost:3000/user/verification'>
  <input type = "hidden"name = "email" value = "${email}"/>
  <button type = "submit" style ="background-color : blue; color : white;width : 200px"; border : none; border: 1px solid grey; border-radius:10px>varify</button>
  </form>
  <p>
  <h2>thank you<h2>
  backend api team
  </p>
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    reject(error);
  } else {
    resolve('Email sent: ' + info.response);
  }
}); 


    })
}

export const generateToken = (email,userid,contact)=>{
  let payload = {email,userid,contact};
  return jwt.sign(payload,process.env.SECRETKEY);
}