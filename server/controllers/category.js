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
          categoryList: doc
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
  const id = req.params.id;
 
  Category.findOne({_id: id})    
    .exec()
    .then(doc => {      
      if (doc) {
        res.status(200).json({
          category: doc
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
  const catname = req.body.name;
  const description = req.body.description;
  
  category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: catname,
    description: description
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

exports.category_edit = (req, res, next) => {
  const id = req.params.id;
  const newcatname = req.body.name;
  const description = req.body.description;
  console.log('EDIT CAT', newcatname)

  Category.findOneAndUpdate({_id: id}, 
    {
      name: newcatname,
      description: description
    }, 
    {
      new: true
    })    
    .then((updatedDoc) => {    
      if (!updatedDoc){
        console.log(updatedDoc);
        res.status(200).json({        
          message: 'This category not exist'
        });
      }
      res.status(200).json({
        category: updatedDoc,
        message: 'Successfuly edit category'
      });      
    });    
    
}

exports.category_delete = (req, res, next) => {
  const id = req.params.id;

  Category.findOne({_id: id})
    .exec()
    .then(doc => {
      if(doc) {
        console.log('SUBBB', doc.subcategory);
        if(doc.subcategory.length < 1){
          Category.remove({ _id: id })
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
        } else {
          res.status(500).json({ 
            message: "Category have subcategory",
            error: 'Error delete category'
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error find',
        error: err
      });
    });
  
}
