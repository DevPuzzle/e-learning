const mongoose = require('mongoose');

const Course = require('../models/course');
const Theme = require('../models/theme');
const User = require('../models/user');
const Comment = require('../models/comment');
const Category = require('../models/category');

exports.course_cover_create = (req, res, next) => {
  const coursename = req.body.name;
  const info = req.body.info;
  const description = req.body.description;  
  const path = req.file.path;
  const author_id = req.userData.userId;
  const theme_id = req.body.theme_id;
  // console.log("Author_id", author_id);
  // console.log('Path', path);

  course = new Course({
    _id: new mongoose.Types.ObjectId(),
    name: coursename,
    info: info,
    description: description,
    image: path,
    author: author_id,
    theme: theme_id
  });
  course
    .save()
    .then(doc => {

      Theme.update({ _id: theme_id },
        {    
          $push: { course: doc._id }
        })
        .exec()        
        .catch(err => {          
          res.status(500).json({
            error: err,
            message: 'Error theme get course'
          });
        });

      User.update({ _id: author_id },
        {    
          $push: { course: doc._id }
        })
        .exec()        
        .catch(err => {          
          res.status(500).json({
            error: err,
            message: 'Error user get course'
          });
        });

      console.log(doc);
      res.status(200).json({
        course_cover: doc,
        message: 'Successfuly create course cover'
      });
    })

}

exports.course_list = (req, res, next) => {
  Category.find({})
    .select('_id name')
    .populate({
      path: 'subcategory', 
      select: '_id name',
      populate: {
        path: 'theme',
        select: '_id name',
        populate: {
          path: 'course'          
        }
      }
    })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          list: doc
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    }); 

}