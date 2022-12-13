const express = require("express");
const { default: mongoose } = require("mongoose");
router = express.Router();



const user =require("../models/account_model");
//const User = new mongoose.model("User",username);



router.get("/sigup", (req, res)=> {
    res.send("This is sigup in page");
 }),
    
router.post("/sigup",async (req, res)=> {
    console.log(req.body);
    const account = new user(req.body);
 account.save().then(()=>{
    res.status(200).send(account);
 }).catch((err)=>{
    res.send(err);
 });
   
 }),
    
   
   
   
module.exports = router;