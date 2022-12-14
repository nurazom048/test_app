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
   

       if( req.params.username ===  req.username.username){
       
        res.status(200).send("account");



       } else{
        console.log("noth macth")
       }
     //console.log(req.params.username);

           // res.json({ m :req.params.username})

       //     //await console.log(req.params.username);
       // }
       
    }catch (err) {throw(err)}
} );
           

module.exports = router;

