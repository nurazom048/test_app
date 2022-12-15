const express = require("express");
router = express.Router();
const user =require("../models/account_model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");





//  login
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


