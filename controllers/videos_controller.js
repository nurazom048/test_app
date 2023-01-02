const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
const Account =require("../models/account_model");
 require("mongoose");

// upload video 
exports.uploadVideo = async (req, res) => {
    const { title, description, videoUrl } = req.body;

    try {
        // create a new Video object with the provided data
        const uploadVideo = new Video({ 
            username: req.user.username,
            title,
            description,
            videoUrl
        });

        // save the video to the database
        const savedVideo = await uploadVideo.save();
        console.log('Video uploaded successfully');
        return res.status(200).json({ message: "Video uploaded successfully", savedVideo });
    
    
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error uploading video' });
    }
};

//....... edit video
exports.editVideo = async (req, res) => {
    const {_id} = req.params;
    const video = await Video.findById(_id);

try {

    // If the video does not exist, return an error message
    if (!video) return res.status(404).json({ message: "Video does not exist" });
    if(video.username !== req.user.username) return res.status(404).json({ message: "you can only edit your video" });
    
    // Update the video
    const updatedVideo = await Video.findByIdAndUpdate(_id, req.body, { new: true });
    return res.status(200).json({ message: "Video updated successfully", updatedVideo });
   
} catch (error) {
    return res.status(500).json({ message: "Error updating video" });
    }
};


 

//*********    delete_video  ************* */
exports.delete_video = async (req, res) => {
    const{_id}= req.params;
    const video = await Video.findById(_id);
    try {
     
     
      // If the video does not exist, return an error message
      if (!video) return res.status(404).json({ message: "Video does not exist" });
      if(video.username !== req.user.username)  return res.status(404).json({ message: "you can only delete your video" });
      
      // Delete the video
      await Video.findByIdAndDelete(_id);
      return res.status(200).json({ message: "Video deleted successfully" });
    
    
    
    } catch (error) {
    
      return res.status(500).json({ message: "Error deleting video" });
    }
  };
  

  //*********************************** */
  
  exports.fallowing_users_video = async (req, res) => {
    try {
      // Find the user with the provided username
      const user = await User.findOne({ username: req.user.username });
      // Get the list of users that the current user is following
      const followingUsers = user.flowing;
      // Find all videos from the users that the current user is following
      const videos = await Video.find({ username: { $in: followingUsers } });
      // Sort the videos by their creation date in descending order
      const sortedVideos = videos.sort((a, b) => b.createdAt - a.createdAt);
      // Return the sorted list of videos
      return res.status(200).json(sortedVideos);
   
   
    } catch (error) {
      throw error;
    }
  };


  /// GET FLLOWING USER 
exports.getFollowingUsers = async (req, res) => {



try {
    
    const user = await Account.findOne({ username: req.user.username });

    // get following users' _id and username
    const followingUsers = await Promise.all(user.flowing.map(async followingUsername => {
    const followingUser = await Account.findOne({ username: followingUsername });
    return {
      _id: followingUser._id,
      username: followingUser.username
      };}));
  
     
      res.status(200).json( followingUsers);


    } catch (error) {
     
      res.status(500).json({ message: "Error getting following users" });
    }
  };
  