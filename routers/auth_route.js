const express = require("express");
const { default: mongoose } = require("mongoose");
router = express.Router();
const user =require("../models/account_model");

const jwt = require("jsonwebtoken");



router.get("/signup", (req, res)=> {
    res.send("This is sighup in page");
    }),
 
 
 
    //!***** signup account    
router.post("/signup",async (req, res)=> {
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
   
 }),
    
   
   


//***************** login ********************** */



 //!***** Login account 
router.post("/login",async (req, res)=> {
       /// console.log(req.body.password);
        try {
           await user.findOne({ username: req.body.username }).then(u=>{
    
         
               
             if (!user){res.status(401).json({message: "user not exists"})}
                 else if (req.body.password === u.password )
                       {
                      const token = jwt.sign({ username: u.username }, "ahjkdfhkjsgh");
                      // res.cookie("access_token", token, {
                      // httpOnly: true,
                      //  });
                      res.status(200).json({toke:  token})
                      console.log("login successfully");
                      }else{ res.status(401).json({message: "Auth not match"})}; });
         


       }catch (err) {throw(err)}
           





});
module.exports = router;


