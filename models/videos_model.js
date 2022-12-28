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
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    comment: {
      type: [String],
      default: [],
    },
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
