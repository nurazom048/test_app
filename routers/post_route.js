const express = require("express");
router = express.Router();
const verifyToken = require("../verifyToken"); 
const { upload_post ,edit_post,delete_post,like,unlike} = require("../controllers/post_controller");
require("../controllers/videos_controller");



router.post("/post/upload", verifyToken,upload_post);/// upload post 
router.post("/post/edit/:_id", verifyToken,edit_post);// edit post 
router.delete("/post/delete/:_id", verifyToken,delete_post);/// delete post 






module.exports = router;
