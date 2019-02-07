const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');
const student = require('../middleware/student');

router.get("/get", checkAuth, student, UserController.user_get);

module.exports = router;