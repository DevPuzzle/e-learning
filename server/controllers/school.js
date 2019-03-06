const mongoose = require('mongoose');

const School = require('../models/school');
const Course = require('../models/course');
const User = require('../models/user');
const Comment = require('../models/comment');
const getSlug = require('speakingurl');

const fs = require('fs');

exports.school_create = (req, res, next) => {  
  const creator_id = req.userData.userId;

  const schoolname = req.body.name;
  //const country = req.body.country;
  const state = req.body.state;
  const city = req.body.city;
  const address = req.body.address;
  const info = req.body.info;
  const image = req.files[0].path;
  const logo = req.files[1].path; 
  const url = getSlug(schoolname, {
          separator: '_'
        });
  // console.log('REQ file1', req.files[0].path);
  // console.log('REQ file2', req.files[1].path);
  school = new School({
    _id: new mongoose.Types.ObjectId(),
    name: schoolname, 
    //country: country,
    state: state,
    city: city,
    address: address,    
    info: info,
    image: image,
    logo: logo,
    creator: creator_id,
    url: url
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

      School.populate(doc, {
        path: 'creator',
        select: '_id name',
      })
      .then(() => {
        console.log(doc);
        res.status(200).json({
          school: doc,                
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

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: 'Error create school'
      });
    });
}

exports.school_get = (req, res, next) => {
  const url = req.params.url;

  School.findOne({url: url})
    .populate([
      {
        path: 'course',
        select: '_id name'
      },
      {
        path: 'creator',
        select: '_id name'
      }
    ])
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          error: 'This school not exist'
        })
      }
      
      res.status(200).json({
        school: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err})
    })
}

exports.school_list = (req, res, next) => {
  School.find({})
  .exec()
  .then(doc => {
    if(doc) {
      res.status(200).json({
        schoolList: doc
      });
    } else {
      res.status(500).json({
        error: 'Not exist schools'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.school_edit = (req, res, next) => {  
  
  const image = req.files[0].path;
  const logo = req.files[1].path;  
  
  const path_image = () => {
    if(req.body.image === '1'){
      return req.body.old_image
    }else{
      //delete school old image from server
      fs.unlink(req.body.old_image, (err) => {
        if (err) return console.log(err);
        console.log('successfully deleted', req.body.old_image);            
      });      
      return image;
    }
  }

  const path_logo = () => {
    if(req.body.logo === '1'){
      return req.body.old_logo
    }else{
      //delete school old logo from server
      fs.unlink(req.body.old_logo, (err) => {
        if (err) return console.log(err);
        console.log('successfully deleted', req.body.old_logo);            
      });
      return logo; 
    }
  }
  // console.log('OLD IMAGE', req.body.old_image)
  // console.log('req.body.image ==', req.body.image)
  const id = req.params.id;
  const creator_id = req.userData.userId;

  const schoolname = req.body.name;
  const state = req.body.state;
  const city = req.body.city;
  const address = req.body.address;
  const info = req.body.info; 
  const url = getSlug(schoolname, {
    separator: '_'
  });
  
  School.findOneAndUpdate({_id: id},
    {
      name: schoolname,
      state: state,
      city: city,
      address: address,
      info: info,
      image: path_image(),
      logo: path_logo(),
      creator: creator_id,
      url: url,
    },
    {
      new: true
    })
    .then((updatedDoc) => {
      if(!updatedDoc){
        console.log(updatedDoc)
        res.status(500).json({        
          message: 'This school not exist'
        });
      }
      res.status(200).json({
        school: updatedDoc,
        message: 'Successfuly edit school'
      });
    });

}

exports.school_delete = (req, res, next) => {
  const id = req.params.id;

  School.findOneAndDelete({_id: id})
    .exec()
    .then(doc => {
      if(doc) {

        //const course_id = doc.course;
        const creator_id = doc.creator;        

        // delete school image and logo from server
        const path_image = doc.image;
        const path_logo = doc.logo;

        fs.unlink(path_image, (err) => {
          if (err) return console.log(err);
          console.log('successfully deleted', path_image);            
        });

        fs.unlink(path_logo, (err) => {
          if (err) return console.log(err);
          console.log('successfully deleted', path_logo);            
        });
        /* Course.update({_id: course_id},
          {
            $pull: {school: {$in: [id]}}
          })
          .exec()
          .then(() => {
            console.log('UPDATED COURSE');
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              message: "Error find user",
              error: err
            });
          }); */
        User.update({_id: creator_id},
          {
            $pull: {school: {$in: [id]}}
          })
          .exec()
          .then(() => {
            console.log('UPDATED USER');              
          })
          .catch(err => {
            console.log(500)
            res.status(500).json({
              message: 'Error find user',
              error: err
            });
          });

          res.status(200).json({
            message: 'Successfuly school delete and user model updated'
          })
      } else {
        res.status(500).json({
          error: 'This school not exist'          
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Error school delete"
      })
    })
}