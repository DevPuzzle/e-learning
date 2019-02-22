const mongoose = require('mongoose');

const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

exports.subcategory_create = (req, res, next) => {
  const subcatname = req.body.name;
  const cat_id = req.body.cat_id;
  const description = req.body.description;
    
  subcategory = new Subcategory({
    _id: new mongoose.Types.ObjectId(),
    name: subcatname,
    description: description,
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
            message: 'Successfuly created subcategory and Category get subcategory!!!'          
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
          subcategoryList: doc
        });        
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

exports.themes_of_subcategory = (req, res, next) => {
  const id = req.params.id;

  Subcategory.findOne({_id: id})   
    .populate('theme') 
    .exec()
    .then(doc => {      
      if (doc) {
        res.status(200).json({
          themes: doc.theme
        });
      } else {
        res.status(404)
          .json({ message: "Not exist this subcategory id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });      
    });
}

exports.subcategory_get = (req, res, next) => {
  const id = req.params.id;
  console.log('GET SUBCATEGORY',subcatname);
 
  Subcategory.findOne({_id: id})    
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
  const id = req.params.id;

  Subcategory.findOne({_id: id})
    .exec()
    .then(doc => {
      if(doc) { 
        console.log('Theme', doc.theme);       
        const cat_id = doc.category;

        if(doc.theme.length < 1){

          Subcategory.remove({ _id: id })
            .exec()
            .then(() => {
              console.log('Subcategory removed')
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err,
                message: "Error delete subcategory"
              });
            });

            Category.update({ _id: cat_id },
              {
                $pull: {subcategory: { $in: [id] }}
              })          
              .exec()
              .then(() => {
                console.log('Category updated');                
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ 
                  message: "Error find category",
                  error: err 
                });
              }); 

            res.status(200).json({
              message: "Successfuly subcategory deleted"
            });
        } else {
          res.status(500).json({ 
            message: "Subcategory have theme",
            error: 'Error delete subcategory'
          });
        }        
        
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

exports.subcategory_edit = (req, res, next) => {
  const id = req.params.id;
  const newsubcatname = req.body.name;
  const description = req.body.description;
  console.log('EDIT SUBCAT', newsubcatname)

  Subcategory.findOneAndUpdate({_id: id}, 
    {
      name: newsubcatname,
      description: description
    }, 
    {
      new: true
    })    
    .then((updatedDoc) => {    
      if (!updatedDoc){
        console.log(updatedDoc);
        res.status(200).json({        
          message: 'This subcategory not exist'
        });
      }
      res.status(200).json({
        subcategory: updatedDoc,
        message: 'Successfuly edit subcategory'
      });      
    });    
    
}