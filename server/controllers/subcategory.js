const mongoose = require('mongoose');

const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

exports.subcategory_create = (req, res, next) => {
  const subcatname = req.body.subcatname;
  const cat_id = req.body.cat_id;
    
  subcategory = new Subcategory({
    _id: new mongoose.Types.ObjectId(),
    name: subcatname,
    category: cat_id
  });
  subcategory
    .save()    
    .then( () => {      
      
      Category.update({ _id: cat_id },
        {    
          $push: { subcategory: subcategory._id }
        })
        .exec()
        .then(result => {
          console.log(result);   
          res.status(200).json({
            subcategory: subcategory,
            message: 'Category get subcategory!!!'          
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err,
            message: 'Error category get subcategory'
          });
        });

    })    
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: 'Error create subcategory'
      });
    });   

}  

exports.subcategory_list = (req, res, next) => {
  console.log('SUBCATEGORY LIST');
  
  Subcategory.find({})    
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          subcategoriesList: doc
        });        
      } else {
        res.status(500).json({
          message: 'Not exist doc fuck it'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    }); 
}  

exports.subcategory_get = (req, res, next) => {
  const subcatname = req.params.subcatname;
  console.log('GET SUBCATEGORY',subcatname);
 
  Subcategory.findOne({name: subcatname})    
    .exec()
    .then(doc => {      
      if (doc) {
        res.status(200).json({
          subcategory: doc
        });
      } else {
        res.status(404)
          .json({ message: "Not exist this subcategory name" });
      }
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({ 
        error: err,
        message: 'Error find subcat'
      });      
    });
}

exports.subcategory_delete = (req, res, next) => {

  Subcategory.findOneAndDelete({name: req.params.subcatname})
    .exec()
    .then(doc => {
      if(doc) {
        const subcat_id = doc._id;
        const cat_id = doc.category;
        // console.log('SUBB', subcat_id)
        // console.log('CAT', cat_id)
        Category.update({ _id: cat_id },
          {
            $pull: {subcategory: { $in: [subcat_id] }}
          })          
          .exec()
          .then(result => {
            console.log(result);
            res.status(200).json({
              message: "Successfuly subcategory delete and category update"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ 
              message: "Error find category",
              error: err 
            });
          });
      }
    })    
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "This subcategory not exist or Some Error"
      });
    });

}