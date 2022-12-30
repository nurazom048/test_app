const express = require("express");
router = express.Router();
const {course_create,course_edit, course_delete, chapter_create,chapter_edit,chapter_delete ,chapter_add_video,chapter_remove_video} = require("../controllers/course_controller");
const verifyToken = require("../verifyToken");


// course
router.post('/courses/',verifyToken,course_create );
router.post('/courses/:id/edit', verifyToken,course_edit );
router.delete('/courses/:courseId', verifyToken,course_delete );


//  chapter
router.post('/courses/:id/chapters',verifyToken,chapter_create);
router.post('/courses/:id/chapters/:chaptername',verifyToken,chapter_edit);
router.delete('/courses/:id/chapters/:chaptername',verifyToken,chapter_delete);



// video inside chapter
router.post('/courses/:courseId/chapters/:chapterName/videos/:videoId',verifyToken,chapter_add_video);
router.delete('/courses/:courseId/chapters/:chapterName/videos/:videoId',verifyToken,chapter_remove_video);

  


module.exports = router;
