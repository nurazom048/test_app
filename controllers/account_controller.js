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
    if(other.accounttype === "institute") return res.status(401).json({message: "you cannot follow an institute account"});

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
}






//...subcrib to other account 
exports.subscribeToAccount = async (req, res) => {
  const {username} = req.params;
  const other = await Account.findOne({ username:username});
  const isSubscribed = await Account.findOne({ _id: req.user._id, subscribed: username});

  try {
    if (!other) return res.status(401).json({message: "Account does not exist"});
    if (req.user.username === username) return res.status(401).json({message: "You cannot subscribe to your own account"});
    if (isSubscribed) return res.status(401).json({message: "You are already subscribed to this account"});

    if (other.accounttype === "institute") {
      const updatedOther = await Account.findOneAndUpdate({ username: username }, {$push: {subscribers: req.user._id}}, {new : true});
      const updatedUser = await Account.findOneAndUpdate({ _id: req.user._id }, {$push: {subscribed: username}}, {new : true});
      return res.status(200).json({message: "Subscription successful", updatedOther, updatedUser});
    } else {
      return res.status(401).json({message: "You can only subscribe to institute accounts"});
    }
  } catch (error) {
    res.status(401).json({message: "Something went wrong"});
  }
}




//...unsubscribe  account
exports.unsubscribeFromAccount = async (req, res) => {
  const {username} = req.params;
  const other = await Account.findOne({ username:username});
  const isSubscribed = await Account.findOne({ _id: req.user._id, subscribed: username});
  
  try {
  if (!other) return res.status(401).json({message: "Account does not exist"});
  if (!isSubscribed) return res.status(401).json({message: "You are not subscribed to this account"});
  

  if (other.accounttype === "institute") {
    const updatedOther = await Account.findOneAndUpdate({ username: username }, {$pull: {subscribers: req.user._id}}, {new : true});
    const updatedUser = await Account.findOneAndUpdate({ _id: req.user._id }, {$pull: {subscribed: username}}, {new : true});
    return res.status(200).json({message: "Unsubscription successful", updatedOther, updatedUser});
  } else {
    return res.status(401).json({message: "You can only unsubscribe from institute accounts"});
  }
  } catch (error) {
  res.status(401).json({message: "Something went wrong"});
  }
  }
  
  
  
  