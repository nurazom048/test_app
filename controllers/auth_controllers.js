const express = require("express");
router = express.Router();
const Account =require("../models/account_model");
const jwt = require("jsonwebtoken");


//***************** login ********************** */
exports.login = async (req, res)=> {
 
    const { username, password } = req.body;
    const account = await Account.findOne({ username });
    console.log(account.password==password);

 try {
    if (!account) return res.status(401).json({ message: "account does not exist" });
    // If the password does not match, return an error message
    if (password !== account.password) return res.status(401).json({ message: "Incorrect password" });

    // If the username and password match, sign and return a JSON web token 
    const token = jwt.sign({ username: account.username, _id: account._id }, "secret");
    // res.cookie("access_token", token, {
                   // httpOnly: true,
                   //  });
   
    res.status(200).json({ massage: "Account Login Sucsessfull", token });


    }catch (err) {
        
        res.status(500).json({ message: "Error logging in",err });
    }
        
};
   


//***************** create_account  ********************** */


exports.create_account = async (req, res) => {
    console.log(req.body);
    const { name, username, password, mainpic, coverpic, accounttype } = req.body;
  
    try {

      const isAccountExist = await Account.findOne({ username });
      if (isAccountExist) return res.status(401).json({ message: "Account already exists" });
  
      // Create a new account
      const account = new Account({ name, username, password, mainpic, coverpic, accounttype });
      const created = await account.save();
  
      // Send response
      res.status(200).json({massage: "Account created Sucsessfull", created});
   
   
    } catch (error) {
      res.send(error);
    }
  }
  

 //***************** update Account ********************** */


exports.updateAccount = async (req, res) => {
    const { name, password, mainpic, coverpic } = req.body;
    const { username } = req.params;
   
    try {
      if (username !== req.user.username)return res.status(401).json({ message: "You can only update your own account" });
      
      // ... updte an send response
      const updatedAccount = await Account.findOneAndUpdate({ username }, { name, password, mainpic, coverpic }, { new: true });
      res.status(200).json([updatedAccount, { message: "Your account has been updated" }]);
   
   
    } catch (error) {
      throw error;
    }
  };
  

 //***************** delete Account ********************** */
 exports. deleteAccount = async (req, res)=> {
    const { username } = req.params;
    const isAccountExist = await Account.findOne({ username });
    console.log(req.user,username);
    

    
    try {

    if (!isAccountExist) return res.status(401).json({ message: "Account is not exists" });
    if( username!==req.user.username) return res.status(401).json({ message: "You can only Delete your own account" });
       
        await Account.findOneAndDelete(req.user.username);
        res.json([{ massage : "your Account is deleted "}])
        
    }catch (err) {throw(err)}
 } 
