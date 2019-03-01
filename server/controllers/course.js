const mongoose = require('mongoose');

const Course = require('../models/course');
const Theme = require('../models/theme');
const User = require('../models/user');
//const Comment = require('../models/comment');
const Category = require('../models/category');

const fs = require('fs');

exports.course_cover_create = (req, res, next) => {
  const coursename = req.body.name;
  const info = req.body.info;
  const description = req.body.description;  
  const path = req.file.path;
  const author_id = req.userData.userId;
  const theme_id = req.body.theme_id;
  //const author_name = req.body.author_name;
  console.log('THEME NAME', req.body.theme_name) 
  
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

      Course.populate(doc, {
        path: 'theme',
        select: 'name -_id',
        populate: {
          path: 'subcategory',
          select: 'name -_id',
          populate: {
            path: 'category',
            select: 'name -_id'          
          }        
        }
      })
      .then(() => {
        console.log(doc);
        res.status(200).json({
          course_cover: doc,          
          message: 'Successfuly create course cover'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
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

exports.course_get = (req, res, next) => {
  const id = req.params.id;

  Course.findOne({_id: id})
    .populate([
      {
      path: 'theme',
      select: '_id name'      
      },
      {
      path: 'author',
      select: '_id name'
      }
    ])    
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          error: 'This course not exist'
        })  
      }
      res.status(200).json({
        course: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    })
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
      
    } else {
      res.status(500).json({
        error: 'Not exist courses'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.course_cover_edit = (req, res, next) => { 
  
  const path = () => {
    if(req.body.image === '1'){
      return req.body.old_image
    }else{
      //delete course old image from server      
      fs.unlink(req.body.old_image, (err) => {
        if (err) return console.log(err);
        console.log('successfully deleted', req.body.old_image);            
      });      
      return req.file.path
    }
  }  
  //console.log('OLD IMAGE', req.body.old_image)
  
  const id = req.params.id;  
  const author_id = req.userData.userId;

  const description = req.body.description;  
  const coursename = req.body.name;
  const info = req.body.info;
  const theme_id = req.body.theme_id;

  Course.findOneAndUpdate({_id: id},
    {
      name: coursename,
      info: info,
      description: description,
      image: path(),
      author: author_id,
      theme: theme_id
    }, 
    {
      new: true
    })
    .then(updatedDoc => {

      if (!updatedDoc){
        console.log(updatedDoc);
        res.status(500).json({        
          message: 'This course not exist'
        });
      }      

      Course.populate(updatedDoc, {
        path: 'theme',
        select: 'name -_id',
        populate: {
          path: 'subcategory',
          select: 'name -_id',
          populate: {
            path: 'category',
            select: 'name -_id'          
          }        
        }
      })
      .then(() => {
        console.log(updatedDoc);
        res.status(200).json({
          course_cover: updatedDoc,          
          message: 'Successfuly create course cover'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    });   
    
}

exports.course_cover_delete = (req, res , next) => {
    const id = req.params.id;

    Course.findOneAndDelete({_id: id})
      .exec()
      .then(doc => {
        if(doc) {          

          const theme_id = doc.theme;
          const author_id = doc.author;          
          //const comment_id = doc.comment; 
          
          // delete course image from server
          const path = doc.image;
          fs.unlink(path, (err) => {
            if (err) return console.log(err);
            console.log('successfully deleted', path);            
          });

          Theme.update({_id: theme_id},
            {
              $pull: {course: {$in: [id] }}
            })
            .exec()
            .then(() => {
              console.log('UPDATED THEME');              
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
            .then(() => {
              console.log('UPDATED USER');              
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: "Error find user",
                error: err
              });
            });   
            
          res.status(200).json({
            message: "Successfuly course delete and theme, user model updated"
          });
            
        } else {
          res.status(500).json({
            error: 'This course not exist'          
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: "Error course delete"
        })
      })
}