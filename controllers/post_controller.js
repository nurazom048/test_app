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
//***************  like ***************** */


exports.like = async (req, res) => {
    const { Id } = req.params;
    const req_user = await User.findOne({ username: req.user.username });
    const for_video = await Video.findOne({ _id: Id });
    const for_post = await Post.findOne({_id: Id});
    console.log({for_video, for_post});
  
    try {
    if (for_video){

       // Find the post by its ID
        const video = await Video.findOne({_id: Id});
        if (!video) return res.status(404).send({ error: 'video not found' });
      
        // Check if the user has already liked the post
        if (video.likes.includes(req_user._id)) return res.status(400).send({ error: 'video already liked by user' });
      
        // Remove the user from the dislikes array if present
        const dislikeIndex = video.dislikes.indexOf(req_user._id.toString());
        if (dislikeIndex !== -1) {video.dislikes.splice(dislikeIndex, 1);}
      
      
        //Add the user to the likes array
        video.likes.push(req_user._id);
        const liked_video = await video.save(); // Save the updates to the post in the database
        return res.status(200).send({ message: 'video liked successfully',liked_video});

      
    }


    if (for_post){

       const post = await Post.findOne({_id: Id});
       console.log(post);
       // Check if the user has already liked the post
        if (post.likes.includes(req_user._id)) return res.status(400).send({ error: 'Post already liked by user' });
      
        // Remove the user from the dislikes array if present
        const dislikeIndex = post.dislikes.indexOf(req_user._id.toString());
        if (dislikeIndex !== -1) {post.dislikes.splice(dislikeIndex, 1);}
      
      
        //Add the user to the likes array
        post.likes.push(req_user._id);
        const post_liked = await post.save(); // Save the updates to the post in the database
        return res.status(200).send({ message: 'Post liked successfully',post_liked});

        }


      //... post or video are not found
      if (!for_post && !for_video ) return res.status(404).send({ error: 'Id is not valid' });
      



    } catch (error) { console.error(error);return res.status(400).send({ error });
    }
  };
  


//*********** unlike post **************** */
exports.unlike = async (req, res) => {
    const { Id } = req.params;
    const req_user = await User.findOne({ username: req.user.username });
    const for_post = await Post.findOne({  _id: Id });
    const for_video = await Video.findOne({ _id: Id });
    console.log({for_post, for_video})


  try {


   //.......... is this id for the video?
      if (for_video){
   
        const video = await Video.findById(Id);
        if (video.dislikes.includes(req_user._id)) return res.status(404).send({ error: 'you already unliked this video' });
  
        // Remove the user from the dislikes array if present
        const likeIndex = video.likes.indexOf(req_user._id.toString());
        if (likeIndex !== -1) {video.likes.splice(likeIndex, 1);}
        console.log(likeIndex);
    
        // Add the user to the dislikes array
        video.dislikes.push(req_user._id);
        const unliked_video = await video.save();
        return res.status(200).send({ message: 'Video unliked successfully',unliked_video });
      }
//.......... is this id for the post
      if(for_post){


      const post = await Post.findById(Id);
      if (post.dislikes.includes(req_user._id)) return res.status(404).send({ error: 'you already unliked this post' });

      // Remove the user from the dislikes array if present
      const likeIndex = post.likes.indexOf(req_user._id.toString());
       if (likeIndex !== -1) {post.likes.splice(likeIndex, 1);}
  
      // Add the user to the dislikes array
      post.dislikes.push(req_user._id);
      const unliked_post = await post.save();
      return res.status(200).send({ message: 'Post unliked successfully', unliked_post });}

  //... post or video are not found
  if (!for_post && !for_video ) return res.status(404).send({ error: 'Id is not valid' });
      

  
    
} catch (error) {return res.status(400).send({ error });}


}