const express = require("express");
router = express.Router();
const post =require("../models/post_models");
const Video =require("../models/videos_model");
const comment =require("../models/comment_model");

require("mongoose");



//........... add comment.................//
exports.add_comments =  async(req, res) => {
     
   comment_for_videos =  await  Video.findOne({ _id:req.params.id });// to check video is exist or not
   comment_for_post   =  await   post.findOne( {_id: req.params.id});// to check post  is exist or not
  
  
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

    
    } else if (comment_for_post){      //...... if this comment is for post

 
        new_comment =   await comments.save()
        console.log(new_comment) ;
    

        //..... add _comments id to post comments[array]
        updated_comment = await post.findOneAndUpdate({ _id :req.params.id},{ $push : {comment: new_comment._id}},{new:true});
        res.status(200).json({updated_comment,new_comment } );
        console.log("comment id added to post");

    
    }else{


    res.status(400).json({error: "Please try again"});

     } 
} catch (error) {throw(error);}}

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
    



