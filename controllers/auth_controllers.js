const express = require("express");
const { default: mongoose } = require("mongoose");
router = express.Router();
const user =require("../models/account_model");

const jwt = require("jsonwebtoken");


//***************** login ********************** */
exports.user_login = async (req, res)=> {
    /// console.log(req.body.password);
     try {
        await user.findOne({ username: req.body.username }).then(u=>{
 
      
            
          if (!user){res.status(401).json({message: "user not exists"})}
              else if (req.body.password === u.password )
                    {
                   const token = jwt.sign({ username: u.username}, "ahjkdfhkjsgh");
                   // res.cookie("access_token", token, {
                   // httpOnly: true,
                   //  });
                   res.status(200).json({toke:  token})
                   console.log("login successfully");
                   }else{ res.status(401).json({message: "Auth not match"})}; });
      


    }catch (err) {throw(err)}
        
};
   


//***************** SIGNUP ********************** */


exports. user_signup = async (req, res)=> {
    console.log(req.body);
/// later add hash
    const account = new user({
      name:req.body.name,
      username:req.body.username,
      password:req.body.password,
      mainpic:req.body.mainpic,
      coverpic:req.body.coverpic,
});
account.save().then(()=>{
    res.status(200).send(account);
 }).catch((err)=>{
    res.send(err);
 });
   
 }

 //***************** update user ********************** */

 exports. user_update = async (req, res)=> {

    try {

     if( req.params.username ===  req.username.username){
        const   updateduser = await user.findOneAndUpdate(req.username.username,
            { name:req.body.name,
                password:req.body.password,
                mainpic:req.body.mainpic,
                coverpic :req.body.coverpic
             },{new : true})
            console.log(updateduser)
            res.json([updateduser,{ massage : "your Account is updated "}])

            }else{ res.json({massage:"You can Only update your account"})}
 
       
    }catch (err) {throw(err)}
} 


 //***************** delete user ********************** */
 exports. user_delete = async (req, res)=> {
    
    console.log(req.body.name);
    try {
       
      if( req.params.username ===  req.username.username){
       
            await user.findOneAndDelete(req.username.username,)
            res.json([{ massage : "your Account is delete "}])
 
        }else
            {res.json({massage:"You can  delete your Only account"})}
  
        
    }catch (err) {throw(err)}
 } 
