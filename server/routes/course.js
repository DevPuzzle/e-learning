const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/course');
const checkAuth = require('../middleware/check-auth');
const roleTeacher = require('../middleware/teacher');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/course')
  },
  filename: function(req, file, cb){    
    cb(null, Date.now()+ '-' + file.originalname)    
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
},
  fileFilter: fileFilter
});

router.get("/catalog/list", checkAuth, CourseController.catalog_list);

router.get("/list", checkAuth, CourseController.course_list);
// router.get("/:id", CourseController.course_get);
router.post("/cover/create", checkAuth, roleTeacher, upload.single('image'), CourseController.course_cover_create);
router.patch("/edit/:id", checkAuth, roleTeacher, upload.single('image'), CourseController.course_cover_edit);
router.delete("/delete/:id", checkAuth, roleTeacher, CourseController.course_cover_delete);

module.exports = router;