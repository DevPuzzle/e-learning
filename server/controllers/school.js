const mongoose = require('mongoose');

const School = require('../models/school');
const Course = require('../models/course');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.school_create = (req, res, next) => {
  const creator_name = req.body.creator_name;
  const creator_id = req.userData.userId;

  const schoolname = req.body.name;
  const country = req.body.country;
  const state = req.body.state;
  const city = req.body.city;
  const address = req.body.address;
  const info = req.body.info;
  const image = req.files[0].path;
  const logo = req.files[1].path;  
  // console.log('REQ file1', req.files[0].path);
  // console.log('REQ file2', req.files[1].path);
  school = new School({
    _id: new mongoose.Types.ObjectId(),
    name: schoolname, 
    country: country,
    state: state,
    city: city,
    address: address,    
    info: info,
    image: image,
    logo: logo,
    creator: creator_id,
  });
  school
    .save()
    .then(doc => {

      User.update({ _id: creator_id },
        {    
          $push: { school: doc._id }
        })
        .exec()        
        .catch(err => {          
          res.status(500).json({
            error: err,
            message: 'Error user get school'
          });
        });

      console.log(doc);
      res.status(200).json({
        school: doc.school,
        creator_name: creator_name,        
        message: 'Successfuly create school'
      });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: 'Error create school'
      });
    });

}