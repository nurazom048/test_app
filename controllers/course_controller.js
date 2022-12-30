const express = require("express");
router = express.Router();
const Course = require('../models/course_model'); // import the Course model
const User = require('../models/account_model'); // import the Course model
const Video =require("../models/videos_model");



// ......... course create - edit- delete...........///

// Create course
exports.course_create = async (req, res) => {
    console.log(req.body);
    const { title, about } = req.body;
    const loginuser = await User.findOne({ username: req.user.username });

    // Validate request body
    if (!title || !about) return res.status(400).send({ error: 'Missing required fields' });
    
  
    // Create new course
    const course = new Course({
      title: title,
      about: about,
      creator_id: loginuser._id, // Use req.user.id to get the user's ID
    });
  
    try {
      // Save course to the database
      const savedCourse = await course.save();
      return res.status(200).send({ course: savedCourse });



    } catch (error) {
      return res.status(400).send({ error });
    }
 };


// Edit course
exports.course_edit = async (req, res) => {
    const { id } = req.params;
    const { title, about } = req.body;
    const loginuser = await User.findOne({ username : req.user.username});


    
    
    // Find course by ID
    const course = await Course.findById(id);
    if (!course) return res.status(404).send({ error: 'Course not found' });
    
    // Check if user has permission to edit the course
    if (course.creator_id.toString() !== loginuser._id.toString()) {
    return res.status(401).send({ error: 'you can only update your account' });
    }else{


    // Update course
    course.title = title;
    course.about = about;
    
    try {
    //  updated course to the database
    const updatedCourse = await course.save();
    return res.status(200).send({ course: updatedCourse });
    } catch (error) {
    return res.status(400).send({ error });
    }
}
    };



// Delete course
exports.course_delete = async (req, res) => {
    console.log(req.params);
    const { courseId } = req.params;
  
    Course.findById(courseId, (error, course) => {
      if (error) return res.status(400).send({ error });
      if (!course) return res.status(404).send({ error: 'Course not found' });
      
  
        course.remove((error) => {
        if (error)return res.status(400).send({ error })
        return res.status(200).send({ message: 'Course deleted successfully' });
      });
    });
  };
  


// *************** chapter => create - edit- delete ***************************///

// Create a new chapter 
exports.chapter_create = async(req, res) => {
    const { id } = req.params;
    const { title, about } = req.body;
    const loginuser = await User.findOne({ username : req.user.username});

   
try {

    Course.findById(id, (error, course) => {

        if (error) return res.status(400).send({ error });
        if (!course) return res.status(404).send({ error: 'Course not found' });
        
        
          // Check if user has permission to add chapter
          if (course.creator_id.toString() !== loginuser._id.toString()) {
            return res.status(401).send({ error: 'you can only add your chapter' });
          }else{
        
        
           // Check if a chapter with the same title already exists in the course
           const existingChapter = course.chapters.find((chapter) => chapter.title === title);
           if (existingChapter)return res.status(400).send({ error: 'Chapter with this name already exists' });
            
        
          // Create a new chapter object
          const chapter = { title, about };
          course.chapters.push(chapter);
        
          course.save((error) => {
          if (error)return res.status(400).send({ error });
        
          return res.status(201).send({ chapter });
         
          });
        }
    }); 
    
    
} catch (error) {}}


// delete chapter in a course
exports.chapter_delete = async (req, res) => {
    const { id, chaptername } = req.params;
    const loginuser = await User.findOne({ username: req.user.username });
  
    try {
     
      const course = await Course.findById(id);  // Find course by ID
      if (!course) return res.status(404).send({ error: 'Course not found' });
  
      // Check if user has permission to edit the course
      if (course.creator_id.toString() !== loginuser._id.toString()) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
  
      // Find chapter by name
      const chapter = course.chapters.find((chapter) => chapter.title === chaptername);
      if (!chapter) return res.status(404).send({ error: 'Chapter not found' });
  
      // Find chapter index by name
      const chapterIndex = course.chapters.findIndex((chapter) => chapter.title === chaptername);
      if (!chapterIndex) return res.status(404).send({ error: 'Chapter index not found' });
  
      course.chapters.splice(chapterIndex, 1);
      res.send({ message: "Chapter deleted" });



    } catch (error) {
      return res.status(400).send({ error });
    }
  };
  





// Edit a chapter in a course
exports.chapter_edit = async (req, res) => {
  const { id,chaptername } = req.params;
  const { title, about } = req.body;
  const loginuser = await User.findOne({ username: req.user.username });
  // Find course by ID
  const course = await Course.findById(id);
  if (!course) return res.status(404).send({ error: 'Course not found' });

  // Check if user has permission to edit the course
  if (course.creator_id.toString() !== loginuser._id.toString()) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  // Find chapter by name
  const chapter = course.chapters.find((chapter) => chapter.title === chaptername);
  if (!chapter) return res.status(404).send({ error: 'Chapter not found' });

  // Update chapter
  chapter.title = title;
  chapter.about = about;

  try {
    // Save updated course to the database
    const savedCourse = await course.save();
    return res.status(200).send({ course: savedCourse });

    
  } catch (error) {
    return res.status(400).send({ error });
  }
};


// *************** video inside chapter => create - edit- delete ***************************///


// Add a video to a chapter in a course 

exports.chapter_add_video = async (req, res) => {
    console.log(req.params);
    const { courseId, chapterName, videoId } = req.params;

    try {
    
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).send({ error: 'Course not found' });
  
      const chapter = course.chapters.find((chapter) => chapter.title === chapterName);
      if (!chapter) return res.status(404).send({ error: 'Chapter not found' });  // If the chapter is not found
      // If the video is already in the chapter
      if (chapter.videos.includes(videoId)) return res.status(400).send({ error: 'Video already added to chapter' });
  
      chapter.videos.push(videoId);
  
      await course.save();
      return res.status(200).send({ message: 'Video added to chapter successfully' });
   
   
   
   
    } catch (error) {
      return res.status(400).send({ error });
    }
  };
  




  // Delete a video from a chapter in a course
exports.chapter_remove_video = async (req, res) => {
    const { courseId, chapterName, videoId } = req.params;
  
    try {
    
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).send({ error: 'Course not found' });
  
       // If the chapter is not found,
      const chapter = course.chapters.find((chapter) => chapter.title === chapterName);
      if (!chapter) return res.status(404).send({ error: 'Chapter not found' });
  
      // Find the index of the video in the chapter
      const videoIndex = chapter.videos.indexOf(videoId);
      if (videoIndex === -1) return res.status(404).send({ error: 'Video not found' });
  
      // Remove the video from the chapter
      chapter.videos.splice(videoIndex, 1);
  
      // Save the updates to the course in the database
      await course.save();
      return res.status(200).send({ message: 'Video removed to chapter successfully' });
   
   
    } catch (error) {return res.status(400).send({ error });}
  };