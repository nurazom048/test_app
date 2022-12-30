const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  creator_id :{
    type: mongoose.Schema.Types.ObjectId,
   ref:"User"
  },

  chapters: [
    {
      title: {
        type: String,
        required: true,
        unique: true,

      },
      about: {
        type: String,
        
      

      },
      videos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref:"Video",
          default: null

        },
     
      ],
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
