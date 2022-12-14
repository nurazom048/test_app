const express = require("express");
router = express.Router();
const user =require("../models/account_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken");

//  login
router.get("/update",async (req, res)=> {    
     res.send("update");
    /// console.log(req.body.password);
//      try {     
//      }catch (err) {throw(err)}
 });



//  login
router.put("/update/:username" , verifyToken, async (req, res, next)=>{

   // console.log(req.params.username);
    try {
        console.log( req.params.username );
        console.log( req.username.username);
      


       if( req.params.username ==  req.username.username){
       
        console.log(" token Mach")

        res.json({ massage : " login by token"})

       }else{console.log("not Mach")}
 
       
    }catch (err) {throw(err)}
} );
           

module.exports = router;

