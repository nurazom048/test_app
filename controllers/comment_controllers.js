const express = require("express");
router = express.Router();
const post =require("../models/post_models");
const Post =require("../models/post_models");
const Video =require("../models/videos_model");
const Comment =require("../models/comment_model");
const Account =require("../models/account_model");

require("mongoose");



//........... add comment.................//

// Add a comment to either a video or a post
exports.add_comments = async (req, res) => {
    const { id } = req.params;
    const commentForVideos = await Video.findOne({ _id: id });
    const commentForPost = await Post.findOne({ _id: id });
  
    try {
      // Create a new comment
      const comments = new Comment({
        contentid: id,
        username: req.user.username,
        comment: req.body.comment,
      });
  
      // If the comment is for a video, add the comment and update the video
      if (commentForVideos) {
        const newComment = await comments.save();
        const updatedVideo = await Video.findOneAndUpdate(
          { _id: id },
          { $push: { comments: newComment._id } },
          { new: true }
        );
        return res.status(200).json({ updatedVideo, newComment});
      }
  
      // If the comment is for a post, add the comment and update the post
      if (commentForPost) {
        const newComment = await comments.save();
        const updatedPost = await Post.findOneAndUpdate(
          { _id: id },
          { $push: { comments: newComment._id } },
          { new: true }
        );
        return res.status(200).json({ updatedPost, newComment });
      }
  
      // Return an error if the comment is not for a valid content
      return res.status(400).json({ error: "Please try again" });
    } catch (error) {
      throw error;
    }
  };
  
  
// .............. edit_comment................//
exports.edit_comment = async (req, res) => {

    
    find_comment = await comment.findOne({ _id : req.params.id  });
    console.log(find_comment.username);


 try {


    // if comment exists and match with user
   if (find_comment && find_comment.username==tokenowner.username) { 
        
      updated_comment = await comment.findOneAndUpdate({ _id : req.params.id},{ $set : { comment : req.body.comment } },{new:true});
      console.log(updated_comment);
      res.status(200).json({massage: "comment eddied", the_comment : updated_comment } );
       
    } else if (find_comment.username !== tokenowner.username) {
            res.status(400).json({error: "you acn ony edit your comment "});
            console.log("you acn ony edit your comment");
               
    }else {
            console.log("comment not found");
            res.status(400).json({error: "Please try again"});
         }

            
} catch (error) { throw(error); }}
        
//.............. delete_comment................//

exports.delete_comment = async (req, res) => {

        find_comment = await comment.findOne({ _id : req.params.id  });


try {
    // if comment exists and match with user


    if (find_comment && find_comment.username==tokenowner.username) {
        // delete comment
        await comment.findOneAndDelete({ _id : req.params.id  });
        console.log("comment deleted");
        res.status(200).json({massage: "comment deleted" });
        
    } else if (find_comment && find_comment.username != tokenowner.username) {
  
        console.log("you can only  delete your comment");
        res.status(200).json({massage: "you can only  delete your comment" });

    }else {
        console.log("comment not found");
        res.status(400).json({error: "Please try again"});
    }

    
} catch (error) {throw(error); }}
    



// reply Comment model


exports.addReply = async (req, res) => {

  const {id}= req.params;
  const { reply } = req.body;
  const comment = await Comment.findById(id);
 

  try {
  
  
    // If the comment does not exist, return an error message
    if (!comment) return res.status(404).json({ message: "Comment does not exist" });
    
    // Push the reply to the comment's replies array and save 
    comment.replies.push({ user_id : req.user._id, username:req.user.username, reply });
    const updatedComment = await comment.save();
    return res.status(200).json(updatedComment);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding reply" });
  }
};
