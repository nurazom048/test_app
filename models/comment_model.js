const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    contentid: {
      type: String,
      required: true,
    },
    username: {
        type: String,
        required: true,
      },
  
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports  = mongoose.model("Comment",CommentSchema);
