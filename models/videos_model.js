const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
  {

     userId:{
         type: String,
     },
    title: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      //required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: ["1"],
    },
    dislikes: {
      type: [String],
      default: ["1"],
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    
      
    }],
    notes: {
      type: [String],
      default: [],
    },
    username:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


v= mongoose.model("Video",VideoSchema);
module.exports = v;
