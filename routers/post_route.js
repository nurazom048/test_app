const express = require("express");
router = express.Router();
const post =require("../models/post_models");
const user =require("../models/account_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken"); 
const { getVideos } = require("../controllers/videos_controller");
require("../controllers/videos_controller");










/// upload post 
router.post("/post/upload", verifyToken ,async (req, res)=> {

    console.log(tokenowner.username) ;
    const  uploadpost = new post({ username: tokenowner.username,...req.body      });
    try{
     

       await uploadpost.save().then((u)=>{
            console.log("post upload success") ;
            res.status(200).json(u)});
               
    } catch (error) {
        throw(error)
    }   

});

module.exports = router;
