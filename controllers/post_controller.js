const express = require("express");
const { findOneAndDelete } = require("../models/post_models");
router = express.Router();
const post =require("../models/post_models");
const Post =require("../models/post_models");
const Video =require("../models/videos_model");


const User = require('../models/account_model'); // import the Course model

require("mongoose");

/// upload post
exports.upload_post = async(req, res) => {

    console.log(req.user.username);
 
    const  uploadpost = new post({ username: req.user.username,...req.body  });
try{
    await uploadpost.save().then((u)=>{
    console.log("post upload success") ;
    res.status(200).json(u)});
               
} catch (error) {
        throw(error)
}   

}

//.............. edit_post.............
exports.edit_post = async(req, res) => {

try {
    edited_post = await post.findOneAndUpdate({_id :req.params.pid },{ $set: req.body,},{new: true});
 
if ( edited_post) {
    console.log("post edited");
    console.log(edited_post);
    res.status(200).json( edited_post);

    
} else {
    console.log("you can edit only your own post");
    res.status(200).json({massage : "you can edit only your own post"});


}

} catch (error) {
    throw(error)   
}

}

///.............. delete_post.............
exports.delete_post = async(req, res) => {

find_post = await post.findOne({_id :req.params.pid});
if (find_post) {
//
try {

   deleted_post = await post.findOneAndDelete({_id :req.params.pid,username:req.user.username});
    if (deleted_post) {
        console.log("post deleted");
        res.status(200).json({massage : "deleted"});
    } else {
        console.log("you can only delete your post ");
        res.status(200).json({massage : "you can only delete your post "});
    }
   
    
} catch (error) {

    throw(error)   

}
   
} else {
    console.log("post not found");
    res.status(200).json({massage : "post not found"});

}
}
