const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

const checkAuth = require('../middleware/check-auth');
const roleAdmin = require('../middleware/admin');
const roleTeacher = require('../middleware/teacher');
const roleStudent = require('../middleware/student');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){    
    cb(null, Date.now()+ '-' + file.originalname)
    //cb(null, file.originalname + '-' + Date.now() + '.png');
    //cb(null, new Date().toISOString() + file.originalname)
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

router.post("/signup", UserController.user_signup);
router.post("/verifyEmail", UserController.user_active);
router.post("/login", UserController.user_login);
router.get("/profile", checkAuth, UserController.user_get);
router.patch("/avatar/uploads", checkAuth, upload.single('userImage'), UserController.user_avatar_upload);
router.patch("/edit", checkAuth, UserController.user_edit);
router.patch("/edit/password", checkAuth, UserController.user_edit_password);
router.patch("/forgotten/password", UserController.user_forgotten_pass)

// users courses
router.get("/course_cover", checkAuth, UserController.user_course_cover);

//router.delete("/:username", checkAuth, UserController.user_delete);

module.exports = router;