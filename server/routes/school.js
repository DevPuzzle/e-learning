const express = require('express');
const router = express.Router();

const SchoolController = require('../controllers/school');
const checkAuth = require('../middleware/check-auth');
const roleTeacher = require('../middleware/teacher');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/school')
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
  limits:{
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/list", checkAuth, SchoolController.school_list);
// router.get("/:id", SchoolController.school_get);
router.post("/create", checkAuth, roleTeacher, upload.any(), SchoolController.school_create);
router.patch("/edit/:id", checkAuth, roleTeacher, upload.any(), SchoolController.school_edit);
router.delete("/delete/:id", checkAuth, roleTeacher, upload.any(), SchoolController.school_delete);


module.exports = router;