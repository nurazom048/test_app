const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
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



// ****************  update user  ****************//
router.put("/update/:username" , verifyToken, async (req, res, next)=>{

   console.log(req.body.name);
    try {
        // console.log( req.params.username );
        // console.log( req.username.username);
        //  console.log( req.params.username );
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
} );
           

// ****************  delete user  ****************//
router.put("/delete/:username" , verifyToken, async (req, res, next)=>{

    console.log(req.body.name);
    try {
       
      if( req.params.username ===  req.username.username){
       
            await user.findOneAndDelete(req.username.username,)
            res.json([{ massage : "your Account is delete "}])
 
        }else
            {res.json({massage:"You can  delete your Only account"})}
  
        
    }catch (err) {throw(err)}
 } );

 module.exports = router;

