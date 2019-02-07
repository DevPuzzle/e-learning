const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');
const teacher = require('../middleware/teacher');

router.get("/get", teacher, checkAuth, UserController.user_get);

module.exports = router;