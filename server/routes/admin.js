const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');
const admin = require('../middleware/admin');

router.post("/login", admin, UserController.user_login);

module.exports = router;