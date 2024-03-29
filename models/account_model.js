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
    lowercase: true,
    trim: true,
    

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
     accounttype: {
      type: String,
      require: true,
      enum:["profile", "institute"],
      default:"profile",


     },

     follower: {
      unique: true,
      type: [String],
    },
    flowing: {
      unique: true,
      type: [String],
    },
    subscribers: {
      unique: true,
      type: [String],
    },
    subscribed: {
      unique: true,
      type: [String],
    }
  
  });


   User= mongoose.model("Account",userschma);
   module.exports = User;
