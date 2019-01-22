const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
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

router.post("/login", UserController.user_login);

router.get("/:username", UserController.user_get);

router.patch("/edit/:username", upload.single('userImage'), UserController.user_edit);

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;