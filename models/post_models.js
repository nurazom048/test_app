const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {

    //  _Id:{ Object()
    //  type: String,
    //    required: true,

    // },
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
  },
  { timestamps: true }
);


module.exports  = mongoose.model("Post",PostSchema);

