const express = require("express");
const { default: mongoose } = require("mongoose");
router = express.Router();



const user =require("../models/account_model");
//const User = new mongoose.model("User",username);



router.get("/sighup", (req, res)=> {
    res.send("This is sighup in page");
 }),
    
router.post("/signup",async (req, res)=> {
    console.log(req.body);
    const account = new user(req.body);
 account.save().then(()=>{
    res.status(200).send(account);
 }).catch((err)=>{
    res.send(err);
 });
   
 }),
    
   
   
   
module.exports = router;