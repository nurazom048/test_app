const express = require("express");
router = express.Router();



//  login
 router.get("/login", (req, res)=> {
        res.send("This is login page");});
        


module.exports = router;
