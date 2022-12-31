const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {

    userId:{
      type: String,
     

  },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    imgUrl: {
      type: String,
      //required: true,
    },


    likes: {
      type: [String],
      default: ["1"],
    },
    dislikes: {
      type: [String],
      default: ["1"],
    },
    comment: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);


module.exports  = mongoose.model("Post",PostSchema);

