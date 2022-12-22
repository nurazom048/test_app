const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
const user =require("../models/account_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken"); require("mongoose");


 exports.getVideos = async (req, res) =>  {

try{
     const finduser = await user.findOne({ username: tokenowner.username });
            flloingusers =  finduser.flowing;
      
        const allvideos = await  Promise.all(
                flloingusers.map( async (username)=> {
                return await Video.find({username : username})})
             );
          res.status(200).json(allvideos.flat().sort((a, b) => b.createdAt - a.createdAt));      
         
      
      
      
      
    } catch (error) {
    throw(error)
    }   
}
