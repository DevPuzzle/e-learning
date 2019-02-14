const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');
const UserVerify = require('../models/user_verify');
const fs = require('fs');
const nodemailer = require('nodemailer');
const config = require('../config/mailer');
const generator = require('generate-password');
// config mail //
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});

exports.user_signup = (req, res, next) => {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 6}).equals(req.body.confirm_password);

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
        const verify_code = generator.generate({
          length: 10,
          numbers: true
          });

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
            //const role = 'admin'
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              name: req.body.name,
              email: email,
              password: hash,
              active: active,
              role: req.body.role,              
              //role: role
            });
            user
              .save()
              .then(result => {               

                const mailOptions = {
                  from: config.MAIL_USER,
                  to: email,
                  subject: 'Verify your e-learning account',
                  html:`Hi, there,
                  <br/>
                  Thank you for registering!
                  <br/>
                  Please verify your email ${email}
                  <br/>
                  on this link <a href="http://localhost:3000/verifyEmail/${verify_code}">
                    VERIFY ACCOUNT<a/>
                  <br/>
                  Have a pleasant day!`
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });

                // save in doc verify code  
                const user_id = result._id;      
                console.log('USER ID', user_id); 
                const userVerify = new UserVerify({
                  _id: new mongoose.Types.ObjectId(),
                  user_id: user_id,
                  code: verify_code
                })
                .save()                
                
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
  req.check('password', 'Password is invalid').isLength({min: 6});

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
        return res.status(500).json({
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
            message: "Bcrypt compare failed"
          });
        }       

        if (result) {          

          const username = user[0].name;
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              role: user[0].role
            },
            'secretkey',
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successfuly",
            username: username,
            token: token
          });
        }
        res.status(401).json({
          message: "Result Auth failed"
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

exports.user_active = (req, res, next) => {
  const verify_code = req.body.verify_code;  

  UserVerify.findOneAndRemove({ code:  verify_code},    
    {
      rawResult: true
    })
    .then((removedDoc) => {  
      console.log('REMOVE DOC', removedDoc)  
      if (!removedDoc){
        console.log(removedDoc);
        res.status(500).json({        
          error: 'Wrong find document with code'
        });
      }

      const user_id = removedDoc.value.user_id;
      console.log('USER ID', user_id)

      User.findOneAndUpdate({_id: user_id}, 
        {
          active: true      
        }, 
        {
          new: true
        })    
        .then((updatedDoc) => {    
          if (!updatedDoc){
            console.log(updatedDoc);
            res.status(500).json({  
              error: 'Wrong code'              
            });
          }
          res.status(200).json({            
            message: 'Successfuly verify account user'
          });      
        });            
    });   

}

exports.user_forgotten_pass = (req, res, next) => {
  const email = req.body.email;
  const password = generator.generate({
    length: 10,
    numbers: true
    });

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {

    User.findOneAndUpdate({email: email}, 
      {
        password: hash     
      }, 
      {
        new: true
      })    
      .then((updatedDoc) => {    
        if (!updatedDoc){
          console.log(updatedDoc);
          res.status(200).json({        
            message: 'This user not exist'
          });
        }
        res.status(200).json({
          user: updatedDoc,
          message: 'Successfuly created new password'
        });      
      });  

      // Send Mail with new password //
      const mailOptions = {
        from: config.MAIL_USER,
        to: email,
        subject: 'Generate your new e-learning password',
        html:`Hi, there,
        <br/>
        Your new password ${password}
        <br/>
        You can Login on this link <a href="http://localhost:3000/home/login">
        http://localhost:3000/home/login<a/>
        <br/>
        Have a pleasant day!`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    } 
  }) 
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
  const role = req.userData.role;
  console.log('REQ USER ROLE', role);
  //console.log('REQ USER111', req.userData);
  console.log('ID', userId);

  User.findOne({_id: userId})
    .select('first_name last_name email name password userImage role')
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
            role: doc.role                                   
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
