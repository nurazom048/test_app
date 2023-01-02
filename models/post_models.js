const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {

    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true

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
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
     
    },
  },
  { timestamps: true }
);


module.exports  = mongoose.model("Post",PostSchema);

