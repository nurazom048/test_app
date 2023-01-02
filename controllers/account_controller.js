const express = require("express");
router = express.Router();
const Account =require("../models/account_model");



// ......... fllow  account.........
exports.fllow_user_account = async(req, res) => {
  const {username}= req.params;
  const other = await Account.findOne({ username:username});
  const isfllowing = await Account.findOne({ username: req.user.username, flowing : username});


  try {
    if(!other)return res.status(401).json({massage: "other account not found"});
    if(username ==req.user.username) return   res.status(401).json({message: "you cannot fllow yourself"});
    if(isfllowing) return  res.status(401).json({message: "you are already fllow"});

    const others = await Account.findOneAndUpdate({ username: username }, {$push: {follower: req.user.username}}, {new : true});
    const loginuser = await Account.findOneAndUpdate({ username: req.user.username }, {$push: {flowing: username}}, {new : true});
    
    res.status(200).json({message: "fallowing success", loginuser, others});
  } catch (error) {
    res.status(401).json({message: "something went wrong"});
  }
}

// ........... unfllow  account .......//
exports.unfllow_user_account = async (req, res) => {
  const { username } = req.params;
  const isOther = await Account.findOne({ username });
  const isFollowing = await Account.findOne({ username: req.user.username, flowing: username });

  try {
    
    if (!isOther) return res.status(401).json({ message: "User account not found" })
    if (username === req.user.username) return res.status(401).json({ message: "You cannot unfollow yourself" });
    if (!isFollowing) return res.status(401).json({ message: "You are already not following this user" });

    const updatedOthers = await Account.findOneAndUpdate({ username }, { $pull: { follower: req.user.username } }, { new: true });
    const updatedLoginUser = await Account.findOneAndUpdate({ username: req.user.username }, { $pull: { flowing: username } }, { new: true });
    res.status(200).json({ message: "Successfully unfollowed user" ,updatedLoginUser,updatedOthers});
 
 
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};
