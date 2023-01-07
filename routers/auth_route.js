const express = require("express");
router = express.Router();
const authcontroller = require("../controllers/auth_controllers");
router = express.Router();
const verifyToken = require("../verifyToken");


router.get("/signup", (req, res)=> {
    res.send("This is sighup in page");
    }),
    //  login


router.post("/account/create",authcontroller.create_account),  //!***** signup account   
router.post("/login",authcontroller.login), //!***** login account
router.put("/update/:username" , verifyToken, authcontroller.updateAccount),// ***  update user  *******//
router.put("/delete/:username" , verifyToken, authcontroller.deleteAccount),// ***  delete user  *******//

 module.exports = router;

