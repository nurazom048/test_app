const express = require("express");
const { findOneAndDelete } = require("../models/post_models");
router = express.Router();
const post =require("../models/post_models");
const Post =require("../models/post_models");
require("mongoose");






///.............upload post
exports.upload_post = async (req, res) => {
    const { title, imgUrl } = req.body;
    console.log({req: req.user});
    try {
     
      const uploadPost = new Post({ 
        userId: req.user._id,
        username: req.user.username,
        title,
        imgUrl
        
      });
      const savedPost = await uploadPost.save();
      console.log('Post uploaded successfully');
      return res.status(200).json(savedPost);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Error uploading post' });
    }
  };
  
  

//.............. edit_post.............
exports.edit_post = async(req, res) => {
    const {_id } = req.params

try {
    edited_post = await Post.findOneAndUpdate({_id :_id,userId:req.userId },{ $set: req.body,},{new: true});
 
if ( edited_post) {
    console.log("post edited");
    res.status(200).json( edited_post);
} 
   if(!edited_post){
    console.log("you can edit only your own post");
    res.status(200).json({massage : "you can edit only your own post"});
   }


} catch (error) {
    throw(error)   
}

}

//.............. delete_post.............
exports.delete_post = async (req, res) => {
    try {
      const { _id } = req.params;
      const deletedPost = await Post.findOneAndDelete({ _id, username: req.user.username });
  
      if (deletedPost) {
        console.log("Post deleted");
        return res.status(200).json({ message: "Deleted" });
      }
  
      console.log("You can only delete your own post");
      return res.status(200).json({ message: "You can only delete your own post" });


    } catch (error) {
      throw error;
    }
  };
  
