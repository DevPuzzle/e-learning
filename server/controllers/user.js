const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');
const fs = require('fs');
const mailer = require('../mailer/mailer');

exports.user_signup = (req, res, next) => {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirm_password);

  var errors = req.validationErrors();
  if (errors) {    
    return res.status(500).json({
      errors: errors
    });
  }

  const email = req.body.email

  User.find({ email: email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {

        // Flag the account as inactive
        const active = false;

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
            //const status = 'admin'
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              name: req.body.name,
              email: email,
              password: hash,
              active: active,
              status: req.body.status
              //status: status
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
            // Compose an email
            const html = `Hi, there,
              <br/>
              Thank you for registering!
              <br/><br/>
              Please verify your email ${email}
              <br/>
              <a href="http://localhost:3000/user/verify">
                http://localhost:3000/user/verify
              </>
              <br/><br/>
              Have a pleasant day!`;  
            // Send the email
            mailer.sendEmail('adad', email, 'Please verify your email', html)
          }
        });
      }
    });
}

exports.user_active = (req, res, next) => {
  const email = req.body.email;

  User.findOneAndUpdate({email: email}, 
    {
      active: true      
    }, 
    {
      new: true
    })    
    .then((updatedDoc) => {    
      if (!updatedDoc){
        console.log(updatedDoc);
        res.status(200).json({        
          message: 'This email not exist'
        });
      }
      res.status(200).json({
        user: updatedDoc,
        message: 'Successfuly verify user'
      });      
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

      // Check if the account has been active
      if (!user[0].active) {
        console.log('ACTIVE = ', user[0].active);
        return res.status(500).json({
          message: 'You need to verify email first'
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
              userId: user[0]._id,
              status: user[0].status
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

exports.user_avatar_upload = (req, res, next) => {
  const userId = req.userData.userId;

  User.findOne({_id: userId})
    .exec()
    .then(doc => {      
      if (doc) {
        const path = doc.userImage; 
        if(path && path !== null){
          fs.unlink(path, (err) => {
            if (err) return console.log(err);
            console.log('successfully deleted', path);            
          });
          User.update({_id: userId},
            {                
              userImage: req.file.path,      
            }) 
            .exec()
            .then(result => {
              res.status(200).json({
                message: 'User updated!!!',
                userImage: req.file.path
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        } else {

          User.update({_id: userId},
            {                
              userImage: req.file.path,      
            }) 
            .exec()
            .then(result => {
              res.status(200).json({                
                message: 'User updated!!!',
                userImage: req.file.path
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: 'Invalid username',
                error: err
              });
            });          
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ 
        message: "No valid provided name",
        error: err });
    });  
}

exports.user_avatar_delete = (req, res, next) => {
  const userId = req.userData.userId;

  User.findOne({_id: userId})    
    .exec()
    .then(doc => {      
      if (doc) {
        const path = doc.userImage; 
        if(path && path !== null){
          fs.unlink(path, (err) => {
            if (err) return console.log(err);
            console.log('successfully deleted user image', path);          
          });

          User.update({_id: userId},
            {                
              userImage: null     
            }) 
            .exec()
            .then(result => {
              res.status(200).json({
                  message: 'Successfully deleted user image!!!',
                  userImage: null
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: 'Update error',
                error: err
              });
            });

        } else {
          res.status(404).json({
            message: 'User dont have avatar'
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ 
        message: "No valid provided name",
        error: err 
      });
    });  

}

exports.user_edit = (req, res, next) => {
  const userId = req.userData.userId;

  req.check('email', 'Invalid email address').isEmail();  

  var errors = req.validationErrors();
  if (errors) {      
    return res.status(500).json({
      errors: errors
    });
  }

  User.findOne({_id: userId})
    .select('first_name last_name email')
    .exec()
    .then(doc => {      
      if (doc) {
        User.update({_id: userId},
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
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
      } else {
        res.status(404)
          .json({ message: "No valid provided name" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });      
    }); 
  
};

exports.user_edit_password = (req, res, next) => {
  const userId = req.userData.userId;  

  req.check('prev_password', 'Previous password is invalid').isLength({min: 4});
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirm_password);

  var errors = req.validationErrors();
  if (errors) {     
    return res.status(500).json({
      errors: errors
    });
  } 
  //console.log('USER', username);
  User.findOne({_id: userId})
    .select('password')
    .exec()
    .then(doc => {      
      if (doc) {      
        console.log('Prev', req.body.prev_password);         
        bcrypt.compare(req.body.prev_password, doc.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Prev password error"
            });
          }
          if (result) {            
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              } else {

                User.update({_id: userId},
                  {                    
                    password: hash                    
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
                      message: 'Error Update',
                      error: err
                    });
                  });
              }
            }); 
                       
          }
        });          
        
      } else {
        res
          .status(404)
          .json({ message: "No valid provided name" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error error',
        error: err
      });
    });  
}

exports.user_get = (req, res, next) => {

  const userId = req.userData.userId;  
  const status = req.userData.status;
  console.log('REQ USER STATUS', status);
  //console.log('REQ USER111', req.userData);
  console.log('ID', userId);

  User.findOne({_id: userId})
    .select('first_name last_name email name password userImage status')
    .exec()
    .then(doc => {

      console.log("From database", doc);

      if (doc) {        
        res.status(200).json({
            id: doc._id,
            first_name: doc.first_name,
            last_name: doc.last_name,
            username: doc.name,
            email: doc.email,
            password: doc.password,
            confirm_password: doc.password,
            userImage: doc.userImage,
            status: doc.status                                   
        });
      } else {
        res.status(404)
          .json({ message: "No valid entry found for provided name" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  
}
