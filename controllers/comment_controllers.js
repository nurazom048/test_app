const express = require("express");
router = express.Router();
const post =require("../models/post_models");
const Video =require("../models/videos_model");
const comment =require("../models/comment_model");

require("mongoose");



//........... add comment................./
exports.add_comments =  async(req, res) => {
     
   comment_for_videos =  await  Video.findOne({_id :req.params.id });// to chack video is exsist or not
    comment_for_post   =  await   post.findById( req.params.id);// to chack video is exsist or not
    //console.log(comment_for_videos);
  
try {
    const  comments = new comment({
        contentid:req.params.id,
        username:tokenowner.username,
        comment: req.body.comment
        });
   
if (comment_for_videos) {
   
    //..... add _comments
        new_comment =   await comments.save()
        console.log(new_comment) ;
        


    //..... add _comments id to videos comments[array]
        updated_comment = await Video.findOneAndUpdate({ _id :req.params.id},{ $push : {comment: new_comment._id}},{new:true});
        res.status(200).json({updated_comment } );
        console.log("comment id added to videos");

    
} else if (comment_for_post){


    //..... add _comments
    new_comment =   await comments.save()
    console.log(new_comment) ;
    


  //..... add _comments id to post comments[array]
    updated_comment = await post.findOneAndUpdate({ _id :req.params.id},{ $push : {comment: new_comment._id}},{new:true});
    res.status(200).json({updated_comment } );
    console.log("comment id added to post");

    
}else{


    res.status(400).json({error: "Please try again"});

} 
} catch (error) {
    throw(error);

}}