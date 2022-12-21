const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
const user =require("../models/account_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken"); require("mongoose");




// //  login
// router.get("/videos", verifyToken,async (req, res)=> { 
//   //  console.log(req.username.username)   
//     res.json({
//         req: req.username,
//         massage :"update"});

// });


//  login
router.post("/videos/upload", verifyToken ,async (req, res)=> {
    //console.log(req.username) ;
    console.log(tokenowner.username) ;
    const  uploadvideo = new Video({ username: tokenowner.username,...req.body      });
    try{
     

       await uploadvideo.save().then((u)=>{
            console.log("video upload success") ;
            res.status(200).json(u)});
               
    } catch (error) {
        throw(error)
    }   

});

// sub
router.post("/videos/fallow", verifyToken ,async (req, res)=> {
    //console.log(req.username) ;
    console.log(tokenowner.username) ;
    const  uploadvideo = new Video({ username: tokenowner.username,...req.body      });
    try{
     

       await uploadvideo.save().then((u)=>{
            console.log("video upload success") ;
            res.status(200).json(u)});
               
    } catch (error) {
        throw(error)
    }   

});

// all flloing user video
router.get("/videos/fallowingvideo", verifyToken ,async (req, res)=> {
  
 
  
    try{
  const   finduser = await user.findOne({ username: tokenowner.username });
        flloingusers =  finduser.flowing;

   const allvideos = await  Promise.all(
                 flloingusers.map( async (username)=> {
                return await Video.find({username : username})})
       );
    res.status(200).json(allvideos.flat().sort((a, b) => b.createdAt - a.createdAt));      
   




} catch (error) {
        throw(error)
    }   

});


module.exports = router;
