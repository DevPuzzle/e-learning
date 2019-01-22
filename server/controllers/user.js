const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const checkAuth = require('../middleware/check-auth')
const User  = require('../models/user');
const fs = require('fs');

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
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
  const username = req.params.username;
  
  User.findOne({name: username})
    .select('userImage')
    .exec()
    .then(doc => {      
      if (doc) {
        const path = doc.userImage; 
        fs.unlink(path, (err) => {
          if (err) return console.log(err);
          console.log('successfully deleted', path);
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

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {

      User.update({ name: username },
        {
          name: req.body.name,
          password: hash,
          userImage: req.file.path
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
    .select('name password userImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            user: doc            
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