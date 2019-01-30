const mongoose = require('mongoose');
//const User  = require('../models/user');
const Category = require('../models/category');

exports.category_get = (req, res, next) => {
  return res.status(200).json({
    message: 'Category get'
  });
}

