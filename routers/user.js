const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken");
const user =require("../models/account_model");



// ****************  fllow user  ****************//
router.put("/fllow/:username" , verifyToken, async (req, res, next)=>{
 
  const isfllowing = await user.find({ username: tokenowner.username, flowing :  req.params.username})
  console.log( isfllowing.length);


try {
  
  if( req.params.username ==  tokenowner.username  ){
    res.status(401).json({message: "you cannot fllow yourself"});
  
  
    }else{    
    if( isfllowing.length !== 0){
        res.status(401).json({message: "you are already fllow"});
   } else {
    const others = await user.findOne({ username: req.params.username })
    const loginuser = await user.findOne({ username: tokenowner.username })     // user account      
    await loginuser.updateOne({$push: {flowing: req.params.username  }},{new : true});
      // others account     
    await others.updateOne({$push: {follower: tokenowner.username  }},{new : true});
     res.status(200).json({message: "fallowing success"});
     console.log( others);
     console.log( loginuser);
     }}
  
} catch (error) {
  res.status(401).json({message: "something went wrong"});
}
});

// ****************  unfllow user  ****************//
router.put("/unfllow/:username" , verifyToken, async (req, res, next)=>{
 
  const isfllowing = await user.find({ username: tokenowner.username, flowing :  req.params.username})
  console.log( isfllowing);


try {
  
  if( req.params.username ==  tokenowner.username  ){
    res.status(401).json({message: "you cannot unfllow yourself"});
  
  
    }else{   
      
      
    if( isfllowing.length == 1){
      const others = await user.findOne({ username: req.params.username })
      const loginuser = await user.findOne({ username: tokenowner.username })     // user account      
      await loginuser.updateOne({$pull: {flowing: req.params.username  }},{new : true});
 
      await others.updateOne({$pull: {follower: tokenowner.username  }},{new : true});
       res.status(200).json({message: "un fallowing success"});
       console.log( others);
       console.log( loginuser);


      
   } else {
    res.status(401).json({message: "you are already unfllow"});
     }}
  
} catch (error) {
  res.status(401).json({message: "something went wrong"});
}
});
  
 module.exports = router;

