const express = require("express");
router = express.Router();
const post =require("../models/post_models");
const user =require("../models/account_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken"); 
const { upload_post ,edit_post,delete_post} = require("../controllers/post_controller");
require("../controllers/videos_controller");



router.post("/post/upload", verifyToken,upload_post);/// upload post 
router.post("/post/edit/:pid", verifyToken,edit_post);// edit post 
router.delete("/post/delete/:pid", verifyToken,delete_post);/// delete post 



module.exports = router;
