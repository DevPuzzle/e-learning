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

  const email = req.body.email;
  const username = req.body.name;

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
              name: username,
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
                  subject: 'Confirm your account',
                  html:`<div style="background:#fff;font:14px sans-serif;color:#686f7a;border-top:4px solid #0277bd;margin-bottom:20px">                    
                  <div style="border-bottom:1px solid #f2f3f5;padding:20px 30px">              
                    <p style="color:#0277bd;font-size: 20px;font-weight: bold;">
                      eLearning
                    </p>             
                  </div>
        
                  <div style="padding:20px 30px">
                      <div style="font-size:16px;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:20px">                  
                        <p>
                          <a style="text-decoration:none;color:#000">
                            Hi ${username},                          
                          </a>
                        </p> 
                        <p>
                          <a style="text-decoration:none;color:#000">
                            Thank you for registering!
                          </a>
                        </p>
                        
                        <p>
                          <a style="text-decoration:none;color:#000">
                            Please click the button below to confirm your email.  
                          </a>               
                        </p>    
        
                        <p>
                          <a style="text-decoration:none;color:#000">
                            Have a pleasant day!
                          </a>
                        </p>
        
                        <p>
                          <a style="background:#0277bd;padding:7px;border-radius:2px;color:#fff;text-decoration:none"
                          href="http://localhost:3000/verifyEmail/${verify_code}">
                              CONFIRM
                          </a>
                        </p>
        
                    </div>              
                  </div>
                </div>`
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
            role: user[0].role,
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
          res.status(500).json({        
            error: 'This user not exist'
          });
        }

        // Send Mail with new password //
        const username = updatedDoc.name;
        console.log('USERNAME', username);        

        const mailOptions = {
          from: config.MAIL_USER,
          to: email,
          subject: 'Reset Password',
          html:`<div style="background:#fff;font:14px sans-serif;color:#686f7a;border-top:4px solid #0277bd;margin-bottom:20px">                    
          <div style="border-bottom:1px solid #f2f3f5;padding:20px 30px">              
            <p style="color:#0277bd;font-size:20px;font-weight: bold;">
              eLearning
            </p>             
          </div>

          <div style="padding:20px 30px">
              <div style="font-size:16px;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:20px">                  
                <p>
                  <a style="text-decoration:none;color:#000">
                    Hi ${username},                          
                  </a>
                </p> 
                <p>
                  <a style="text-decoration:none;color:#000">
                    Your new password: ${password}
                  </a>
                </p>
                
                <p>
                  <a style="text-decoration:none;color:#000">
                  Please click the button below to login.  
                  </a>               
                </p>    

                <p>
                  <a style="text-decoration:none;color:#000">
                    Have a pleasant day!
                  </a>
                </p>

                <p>
                  <a style="background:#0277bd;padding:7px;border-radius:2px;color:#fff;text-decoration:none"
                    href="http://localhost:3000/login">
                      LOGIN
                  </a>
                </p>

            </div>              
          </div>
        </div>`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        res.status(200).json({
          user: updatedDoc,
          message: 'Successfuly created new password'
        });      
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

exports.user_course_cover = (req, res, next) => {
  const userId = req.userData.userId; 

  User.findOne({_id: userId})
    .select('_id')
    .populate({
      path: 'course'
    })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({          
          user_courses_covers: doc.course
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    }); 
}
