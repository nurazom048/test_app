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
     password:{
      type: String,
      require: true,
    
       },
     mainpic: {
      type: String,
      default:"",
     
  
     },
     coverpic: {
      type: String,
      default:"",
    
     },
     follower: {
      unique: true,
      type: [String],
    },
    flowing: {
      unique: true,
      type: [String],
    }
  
  });


   User= mongoose.model("Account",userschma);
   module.exports = User;
