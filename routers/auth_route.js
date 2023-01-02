const express = require("express");
router = express.Router();
const authcontroller = require("../controllers/auth_controllers");
router = express.Router();
const verifyToken = require("../verifyToken");


router.get("/signup", (req, res)=> {
    res.send("This is sighup in page");
    }),
    //  login
router.get("/update",async (req, res)=> {    
res.send("update");});

router.post("/account/create",authcontroller.create_a_account),  //!***** signup account   
router.post("/login",authcontroller.user_login), //!***** login account
router.put("/update/:username" , verifyToken, authcontroller.user_update),// ***  update user  *******//
router.put("/delete/:username" , verifyToken, authcontroller.user_delete),// ***  delete user  *******//

 module.exports = router;

