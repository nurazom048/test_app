const express = require("express");
router = express.Router();
const verifyToken = require("../verifyToken"); 
const { like,unlike,unlikeremove,likeremove} = require("../controllers/like_unlike_controller");
require("../controllers/videos_controller");





//......... like unlike
router.post("/like/:Id", verifyToken,like);/// like post 
router.post("/post/unlike/:Id", verifyToken,unlike);/// unlike post 

//
router.post("/like/:Id/remove", verifyToken,likeremove);/// like remove 
router.post("/unlike/:Id/remove", verifyToken,unlikeremove);/// unlike post 

module.exports = router;