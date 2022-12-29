const express = require("express");
router = express.Router();
const verifyToken = require("../verifyToken"); 
const {add_comments ,edit_comment,delete_comment} = require("../controllers/comment_controllers");




router.post("/comment/add/:id", verifyToken,add_comments);
router.post("/comment/edit/:id",verifyToken,edit_comment);
router.delete("/comment/delete/:id",verifyToken,delete_comment);






module.exports = router;
