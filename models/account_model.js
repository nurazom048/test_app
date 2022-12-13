const mongoose = require('mongoose');

 const userschma = mongoose.Schema({
   name: {
    type: String,
    require: true,
   },
   username:{
    type: String,
    require: true,
    unique: true,
     },
     mainpic: {
      type: String,
      default:"",
     
  
     },
     coverpic: {
      type: String,
      default:"",
    
     },
  
  });


   User= mongoose.model("Account",userschma);
   module.exports = User;
