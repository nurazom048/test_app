const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
const user =require("../models/account_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken"); 
const { getVideos } = require("../controllers/videos_controller");
require("../controllers/videos_controller");



//  upload videos

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
router.get("/videos/fallowingvideo", verifyToken ,getVideos );


module.exports = router;
