const express = require("express");
router = express.Router();
const verifyToken = require("../verifyToken"); 
const { upload_post ,edit_post,delete_post,likePost,unlikePost} = require("../controllers/post_controller");
require("../controllers/videos_controller");



router.post("/post/upload", verifyToken,upload_post);/// upload post 
router.post("/post/edit/:pid", verifyToken,edit_post);// edit post 
router.delete("/post/delete/:pid", verifyToken,delete_post);/// delete post 
router.post("/post/like/:postId", verifyToken,likePost);/// like post 
router.post("/post/unlike/:postId", verifyToken,unlikePost);/// unlike post 



module.exports = router;
