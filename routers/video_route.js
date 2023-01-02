const express = require("express");
router = express.Router();
const verifyToken = require("../verifyToken"); 
const  {fallowing_users_video,uploadVideo, editVideo,delete_video,getFollowingUsers} =  require("../controllers/videos_controller");



router.post("/videos/upload", verifyToken ,uploadVideo);//  upload videos
router.post("/videos/edit/:_id", verifyToken ,editVideo);//  edit videos
router.delete("/videos/delete/:_id", verifyToken ,delete_video);//  delete videos


// get all videos of fallowing user
router.get("/videos/fallowing_users_video", verifyToken ,fallowing_users_video );// all fallowing user video
router.get("/videos/fallowing_users", verifyToken ,getFollowingUsers );// all fallowing user video

   

module.exports = router;
