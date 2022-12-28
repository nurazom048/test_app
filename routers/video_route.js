const express = require("express");
router = express.Router();
const verifyToken = require("../verifyToken"); 
const  {fallowing_users_video,uploadVideo, editVideo,delete_video} =  require("../controllers/videos_controller");



router.post("/videos/upload", verifyToken ,uploadVideo);//  upload videos
router.post("/videos/edit/:vid", verifyToken ,editVideo);//  edit videos
router.delete("/videos/delete/:vid", verifyToken ,delete_video);//  delete videos
router.get("/videos/fallowing_users_video", verifyToken ,fallowing_users_video );// all fallowing user video

   

module.exports = router;
