const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
const user =require("../models/account_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken");const { findOneAndUpdate, findById, findOne } = require("../models/post_models");
 require("mongoose");


 exports.fallowing_users_video = async (req, res) =>  {

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
// upload video 
exports.uploadVideo = async (req, res) =>  {
    console.log(tokenowner.username) ;
    const  uploadvideo = new Video({ username: tokenowner.username,...req.body      });
    try{
     

       await uploadvideo.save().then((u)=>{
            console.log("video upload success") ;
            res.status(200).json(u)
        });
               
    } catch (error) {
        throw(error)
    }   

}



// edit video 

exports.editVideo = async (req, res) =>  {
   

try {
    editedvideo = await Video.findOneAndUpdate({_id : req.params.vid ,username: tokenowner.username },{ $set: req.body,},{new: true});

    if (editedvideo) {
       console.log({massage :"updated", editedvideo}) ;
        res.status(200).json(editedvideo);
    } else {
        console.log("you can ony edit your video");
        res.status(420).json({massage : "you can ony edit your video"});

    }


} catch (error) {
    throw(error)
    
}

}


 // delete video 

exports.delete_video = async (req, res) =>  {
   
 try {

  findvideo = await  Video.findOne({_id: req.params.vid });// to chack video is exsist or not


  if (findvideo) {
    editedvideo = await Video.findOneAndDelete({_id : req.params.vid ,username: tokenowner.username });
 
 ///
    if (editedvideo) {
       console.log({massage :"your video is  deleted"}) ;
       res.status(420).json({massage : "your video is  deleted"});
   
     } else {
       console.log("you can ony delete your video");
       res.status(420).json({massage : "you can ony delete your video"});
   
       }
  } else {
    console.log("video doesn't exists");
    res.status(420).json({massage : "video doesn't exists"});
   
  }
} catch (error) { throw(error)}}