const express = require("express");
const { findOneAndDelete } = require("../models/post_models");
router = express.Router();
const post =require("../models/post_models");
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
//***************  like ***************** */


exports.likePost = async (req, res) => {
    const { postId } = req.params;
    const req_user = await User.findOne({ username: req.user.username });
  
    try {
      // Find the post by its ID
      const findpost = await post.findOne({_id: postId});
      if (!findpost) return res.status(404).send({ error: 'Post not found' });
  
      // Check if the user has already liked the post
     if (findpost.likes.includes(req_user._id)) return res.status(400).send({ error: 'Post already liked by user' });
  
      // Remove the user from the dislikes array if present
const dislikeIndex = findpost.dislikes.indexOf(req_user._id.toString());
if (dislikeIndex !== -1) {
  findpost.dislikes.splice(dislikeIndex, 1);
}
  
  
    //Add the user to the likes array
      findpost.likes.push(req_user._id);
     const thepost = await findpost.save(); // Save the updates to the post in the database
      return res.status(200).send({ message: 'Post liked successfully',theepost:  thepost});
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error });
    }
  };
  


//*********** unlike post **************** */
exports.unlikePost = async (req, res) => {
    const { postId } = req.params;
    const req_user = await User.findOne({ username: req.user.username });
  
    try {
      const find_post = await post.findById(postId);
      if (!find_post) return res.status(404).send({ error: 'Post not found' });
      if (find_post.dislikes.includes(req_user._id)) return res.status(404).send({ error: 'you already unliked this post' });
  




        
      // Remove the user from the dislikes array if present
      const likeIndex = find_post.likes.indexOf(req_user._id.toString());
       if (likeIndex !== -1) {
        find_post.likes.splice(likeIndex, 1);
          }
  
      // Add the user to the dislikes array
      find_post.dislikes.push(req_user._id);
      // Save the updates to the post in the database
      const thepost = await find_post.save();
      // Send a success response
      return res.status(200).send({ message: 'Post unliked successfully', theepost: thepost });
    } catch (error) {
      return res.status(400).send({ error });
    }
  };
  