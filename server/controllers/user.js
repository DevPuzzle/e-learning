const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const checkAuth = require('../middleware/check-auth')
const User  = require('../models/user');
const fs = require('fs');

exports.user_signup = (req, res, next) => {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirm_password);

  var errors = req.validationErrors();
  if (errors) {    
    return res.status(500).json({
      errors: errors
    });
  }

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        if (req.body.password !== req.body.confirm_password) {
          // passwords do not match...
          return res.status(500).json({
            error: 'Passwords do not match'
          });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
}

exports.user_login = (req, res, next) => {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4});

  var errors = req.validationErrors();
  if (errors) {    
    return res.status(500).json({
      errors: errors
    });
  }

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const username = user[0].name;
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            'secretkey',
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            username: username,
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.user_edit = (req, res, next) => {
 
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirm_password);

  var errors = req.validationErrors();
  if (errors) {  
    const path = req.file.path; 
    fs.unlink(path, (err) => {
      if (err) return console.log(err);
      console.log('successfully deleted', path);
    });
    //console.log('req.file.path', req.file.path);  
    return res.status(500).json({
      errors: errors
    });
  }

  const imagePath = () => {
    if(!req.file.path){
      return image_path = 'uploads/default-avatar.png';
    } else {
      return image_path = req.file.path;
    }
  }
    
  User.findOne({name: req.body.name})
    .select('userImage password')
    .exec()
    .then(doc => {      
      if (doc) {
        const path = doc.userImage; 
        fs.unlink(path, (err) => {
          if (err) return console.log(err);
          console.log('successfully deleted', path);
        });

        if (doc.password !== req.body.password){
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {        
              User.update({ name: req.body.name },
                {
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  password: hash,
                  userImage: imagePath,
                  email: req.body.email
                }) 
                .exec()
                .then(result => {
                  res.status(200).json({
                      message: 'User updated'
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        } else {
          User.update({ name: req.body.name },
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,              
              userImage: req.file.path,
              email: req.body.email
            }) 
            .exec()
            .then(result => {
              res.status(200).json({
                  message: 'User updated'
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        } 
      } else {
        res
          .status(404)
          .json({ message: "No valid name entry found for provided name" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
  }); 
  
};


exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.user_get = (req, res, next) => {
  const username = req.params.username;
  User.findOne({name: username})
    .select('first_name last_name email name password userImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {        
        // res.status(200).json({
        //   user: doc,          
        // })
        res.status(200).json({
            id: doc._id,
            first_name: doc.first_name,
            last_name: doc.last_name,
            username: doc.name,
            email: doc.email,
            password: doc.password,
            confirm_password: doc.password,
            userImage: doc.userImage                        
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided name" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}