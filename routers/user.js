const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken");
const user =require("../models/account_model");



// ****************  fllow user  ****************//
router.put("/fllow/:username" , verifyToken, async (req, res, next)=>{
 try {
      
      if( req.params.username !== tokenowner.username){
 const u = await user.findOne({ username: req.params.username })
 const you = await user.findOne({ username: tokenowner.username })
    // user account      
  await you.updateOne({$push: {flowing: req.params.username  }},{new : true});
    // others account     
  await u.updateOne({$push: {follower: tokenowner.username  }},{new : true});
  res.status(200).json({message: "fallowing success"});
  
 console.log(u);
 console.log(you);
   } else {
      res.status(401).json({message: "you cannot fllow yourself"});
}

        
     }catch (err) {throw(err)}
 } );

  
 module.exports = router;

