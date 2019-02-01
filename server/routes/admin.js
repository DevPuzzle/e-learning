const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');
const admin = require('../middleware/admin');

router.post("/login", admin, UserController.user_login);
router.get("/:admin/:catname", CategoryController.category_get);

// router.post("/create", CategoryController.category_create);
// router.patch("/update/:catname", CategoryController.user_avatar_upload);
// router.delete("/delete/:catname", CategoryController.user_avatar_delete);

module.exports = router;