const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken");




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

module.exports = router;

