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
    
         
                 //console.log(u.password);
                if (!user){res.status(401).json({message: "user not exists"})}
                 ///const isCorrect = await bcrypt.compare(req.body.password, user.password);
                else if (req.body.password == u.password ){
                  const token = jwt.sign({ username: u._id }, "ahjkdfhkjsgh");
                  res.cookie("access_token", token, {
                    httpOnly: true,
                  });
      
     
                            res.status(200).json(u)
                              console.log("login successfully");
                }else
                  { res.status(401).json({message: "Auth not match"})}; });
         


        }catch (err) {throw(err)}
           





});
module.exports = router;
//         res.send("This is login page");});
        
//  router.post("/login", (req, res,next)=> {
//         user.find({ username: req.body.username})
//         .exec()
//         .then(()=>{  if( req.body.name === user[0].name ){
//                 res.status(401).json({
//                         message: "Auth match"
//                       })
//         }else{
                
//               res.status(401).json({
//                 message: "Auth not match"
//               })
//         }
                 
//         }),
        
//         console.log(req.body);


