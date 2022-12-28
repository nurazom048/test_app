const express = require("express");
router = express.Router();
const verifyToken = require("../verifyToken"); 
const {add_comments } = require("../controllers/comment_controllers");




router.post("/addcomment/:id", verifyToken,add_comments);




module.exports = router;
