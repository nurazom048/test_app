const express = require("express");
const { default: mongoose } = require("mongoose");
router = express.Router();
const user =require("../models/account_model");
const authcontroller = require("../controllers/auth_controllers");

const jwt = require("jsonwebtoken");



router.get("/signup", (req, res)=> {
    res.send("This is sighup in page");
    }),
 
  //!***** signup account    
router.post("/signup",authcontroller.user_signup),

router.post("/login",authcontroller.user_login),

module.exports = router;


