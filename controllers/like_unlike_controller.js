
const express = require("express");
router = express.Router();
const Post =require("../models/post_models");
const Video =require("../models/videos_model");


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
  


//*********** unlike **************** */
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



//*********** unlike remove **************** */
exports.unlikeremove= async (req, res) => {
  const { Id } = req.params;
  const req_user = await User.findOne({ username: req.user.username });
  const for_post = await Post.findOne({  _id: Id });
  const for_video = await Video.findOne({ _id: Id });
  console.log({for_post, for_video})


try {


 //.......... is this id for the video?
    if (for_video){
 
      const video = await Video.findById(Id);
      if (!video.dislikes.includes(req_user._id)) return res.status(404).send({ error: 'you already unliked removed from this video' });

      // Remove the user from the dislikes array if present
      const likeIndex = video.dislikes.indexOf(req_user._id.toString());
      if (likeIndex !== -1) {

      video.dislikes.splice(likeIndex, 1);
      const unliked_video = await video.save();
      return res.status(200).send({ message: 'unlike removed successfully',unliked_video });
    }
  
  }
//.......... is this id for the post
    if(for_post){


    const post = await Post.findById(Id);
    if (!post.dislikes.includes(req_user._id)) return res.status(404).send({ error: 'you already unliked this post' });

    // Remove the user from the dislikes array if present
    const likeIndex = post.dislikes.indexOf(req_user._id.toString());
     if (likeIndex !== -1) {
      
      post.dislikes.splice(likeIndex, 1);
      const unlike_remove = await post.save();
      return res.status(200).send({ message: 'Post unliked removed', unlike_remove });
    }
    }


//... post or video are not found
if (!for_post && !for_video ) return res.status(404).send({ error: 'Id is not valid' });
    


  
} catch (error) {return res.status(400).send({ error });}


}





//*********** like remove **************** */
exports.likeremove= async (req, res) => {
  const { Id } = req.params;
  const req_user = await User.findOne({ username: req.user.username });
  const for_post = await Post.findOne({  _id: Id });
  const for_video = await Video.findOne({ _id: Id });
  console.log({for_post, for_video})


try {


 //.......... is this id for the video?
  if (for_video){
 
      const video = await Video.findById(Id);
      console.log(video)
      if (!video.likes.includes(req_user._id.toString())) return res.status(404).send({ error: 'you already liked removed',ok :video.likes.includes(req_user._id)});

      // Remove the user from the likes array if present
      const likeIndex = video.likes.indexOf(req_user._id.toString());
      if (likeIndex !== -1) {

      video.likes.splice(likeIndex, 1);
      const like_removed = await video.save();
      return res.status(200).send({ message: 'like removed successfully',like_removed });
    }
  
  }
//.......... is this id for the post
    if(for_post){


    const post = await Post.findById(Id);
    if (!post.likes.includes(req_user._id)) return res.status(404).send({ error: 'you already like removed this post ' });

    // Remove the user from the likes array if present
    const likeIndex = post.likes.indexOf(req_user._id.toString());
     if (likeIndex !== -1) {
      
      post.likes.splice(likeIndex, 1);
      const like_removed = await post.save();
      return res.status(200).send({ message: 'Post liked removed', like_removed });
    }
    }


//... post or video are not found
if (!for_post && !for_video ) return res.status(404).send({ error: 'Id is not valid' });
    


  
} catch (error) {return res.status(400).send({ error });}


}