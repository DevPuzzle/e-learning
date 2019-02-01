const mongoose = require('mongoose');
//const User  = require('../models/user');
const Category = require('../models/category');

exports.categories_list = (req, res, next) => {
  // console.log('CATEGORY LIST');
  Category.find({})    
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          doc: doc
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

exports.category_get = (req, res, next) => {
  const catname = req.params.catname;
 
  Category.findOne({name: catname})    
    .exec()
    .then(doc => {      
      if (doc) {
        res.status(200).json({
          doc: doc
        });
      } else {
        res.status(404)
          .json({ message: "Not exist this category name" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });      
    });
}

exports.category_create = (req, res, next) => {
  const catname = req.body.catname;
  
  category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: catname
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        category: result,
        message: 'Successfuly create category'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: 'Error create category'
      });
    });
}  

exports.category_delete = (req, res, next) => {
  Category.remove({ name: req.params.catname })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Successfuly category deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Error delete category"
      });
    });
}
