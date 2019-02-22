const mongoose = require('mongoose');

const Course = require('../models/course');
const Theme = require('../models/theme');
const User = require('../models/user');
//const Comment = require('../models/comment');
const Category = require('../models/category');

exports.course_cover_create = (req, res, next) => {
  const coursename = req.body.name;
  const info = req.body.info;
  const description = req.body.description;  
  const path = req.file.path;
  const author_id = req.userData.userId;
  const theme_id = req.body.theme_id;

  const author_name = req.body.author_name;
  const theme_name = req.body.theme_name;
  
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
        author_name: author_name,
        theme_name: theme_name,
        message: 'Successfuly create course cover'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: 'Error create course'
      });
    });  

}

exports.catalog_list = (req, res, next) => {
  Category.find({})
    .select('_id name')
    .populate({
      path: 'subcategory', 
      select: '_id name',
      populate: {
        path: 'theme',
        select: '_id name'        
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

exports.course_list = (req, res, next) => {
  Course.find({})    
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json({
        courseList: doc
      });
      //return doc;
    } else {
      res.status(500).json({
        message: 'Not exist doc'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.course_cover_edit = (req, res, next) => {
  const id = req.params.id;
  const coursename = req.body.name;
  const info = req.body.info;
  const description = req.body.description;  
  const path = req.file.path;
  const author_id = req.userData.userId;
  const theme_id = req.body.theme_id;
  

  const author_name = req.body.author_name;
  const theme_name = req.body.theme_name;

  Course.findOneAndUpdate({_id: id},
    {
      name: coursename,
      info: info,
      description: description,
      image: path,
      author: author_id,
      theme: theme_id
    }, 
    {
      new: true
    })
    .then((updatedDoc) => {
      if (!updatedDoc){
        console.log(updatedDoc);
        res.status(500).json({        
          message: 'This course not exist'
        });
      }
      res.status(200).json({
        course: updatedDoc,
        author_name: author_name,
        theme_name: theme_name,
        message: 'Successfuly edit course'
      }); 
    });   
    
}

exports.course_cover_delete = (req, res ,next) => {
    const id = req.params.id;

    Course.findOneAndDelete({_id: id})
      .exec()
      .then(doc => {
        if(doc) {

          const theme_id = doc.theme;
          const author_id = doc.author;
          console.log("THEME ID", theme_id);
          console.log('USER ID', author_id);
          //const comment_id = doc.comment;          

          Theme.update({_id: theme_id},
            {
              $pull: {course: {$in: [id] }}
            })
            .exec()
            .then(result => {
              console.log('UPDATE THEME', result);
              
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: "Error find theme",
                error: err
              });
            });  
            
          User.update({_id: author_id},
            {
              $pull: {course: {$in: [id] }}
            })
            .exec()
            .then(result => {
              console.log('UPDATE USER', result);
              
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: "Error find user",
                error: err
              });
            });   
            
          res.status(200).json({
            message: "Successfuly course delete and theme, user update"
          });
            
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: "This course not exist or some error"
        })
      })
}