const express = require("express");
router = express.Router();
const user =require("./models/account_model");
//const jwt = require ("jsonwebtoken");

 const updateduser = async (req, res, next)=>{


         try {
      await console.log(req.params.username);
            // if(verifyToke){
 
           // if( req.params.username ===  req.user.id){
 
 
           // } res.json({ m :req.params.username})
          //console.log(req.params.username);
 
                // res.json({ m :req.params.username})
 
            //     //await console.log(req.params.username);
            // }
            
         }catch (err) {throw(err)}
 } 