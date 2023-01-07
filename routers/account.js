const express = require("express");
router = express.Router();
const Video =require("../models/videos_model");
//const jwt = require ("jsonwebtoken");
const verifyToken = require("../verifyToken");
const user =require("../models/account_model");
const {fllow_user_account, unfllow_user_account,subscribeToAccount,unsubscribeFromAccount} = require("../controllers/account_controller");




// ****************  fllow and unfllow  ****************//
router.put("/fllow/:username" , verifyToken, fllow_user_account);
router.put("/unfllow/:username" , verifyToken,unfllow_user_account );

// ****************  sub  and unsub   ****************//
router.put("/sub/:username" , verifyToken,subscribeToAccount );
router.put("/unsub/:username" , verifyToken,unsubscribeFromAccount );





 module.exports = router;

