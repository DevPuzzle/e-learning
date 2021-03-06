const mongoose = require('mongoose');

const Subcategory = require('../models/subcategory');
const Theme = require('../models/theme');
const getSlug = require('speakingurl');

exports.theme_create = (req, res, next) => {
  const themename = req.body.name;
  const description = req.body.description;
  const subcat_id = req.body.subcat_id;
  const url = getSlug(themename, {
    separator: '_'
  });

  theme = new Theme({
    _id: new mongoose.Types.ObjectId(),
      name: themename,
      description: description,
      subcategory: subcat_id,
      url: url
  })
  theme
    .save()
    .then( () => {
      Subcategory.update({ _id: subcat_id},
        {
          $push: { theme: theme._id }
        })
        .exec()
        .then(result => {
          console.log(result);
          res.status(200).json({
            theme: theme,
            message: 'Successfuly created them and Subcategory get theme!!!'
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err,
            message: 'Error subcategory get theme'
          });
        });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: 'Error create theme'
      });
    });

}

exports.theme_list = (req, res, next) => {
  console.log('THEME LIST');
  
  Theme.find({})    
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          themesList: doc
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

exports.theme_get = (req, res, next) => {
  const id = req.params.id;
  console.log('GET THEME', themename);

  Theme.findOne({_id: id})
    .exec()
    .then(doc => {
      if(doc) {
        res.status(200).json({
          theme: doc          
        });
      } else {
        res.status(404).json({
          message: 'Not exist this theme name'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Error find theme'
      });
    });

}

exports.theme_delete = (req, res, next) => {
  const id = req.params.id

  Theme.findOne({_id: id})
    .exec()
    .then(doc => {
      if(doc) {
        console.log('Course', doc.course);
        const subcat_id = doc.subcategory

        if(doc.course.length < 1){
          Theme.remove({_id: id})
            .exec()
            .then(() => {
              console.log('Theme removed')
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err,
                message: "Error delete theme"
              });
            });

            Subcategory.update({ _id: subcat_id },
              {
                $pull: {theme: { $in: [id] }}
              })          
              .exec()
              .then(() => {
                console.log('Subcategory updated');                
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ 
                  message: "Error find subcategory",
                  error: err 
                });
              }); 

          res.status(200).json({
            message: "Successfuly theme deleted"
          });

        } else {
          res.status(500).json({ 
            message: "Theme have course",
            error: 'Error delete theme'
          });
        }
        
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "This theme not exist or some error"
      })
    })

}

exports.theme_edit = (req, res, next) => {
  const id = req.params.id;
  const newthemename = req.body.name;
  const description = req.body.description;
  console.log('EDIT THEME', newthemename)

  Theme.findOneAndUpdate({_id: id}, 
    {
      name: newthemename,
      description: description
    }, 
    {
      new: true
    })    
    .then((updatedDoc) => {    
      if (!updatedDoc){
        console.log(updatedDoc);
        res.status(500).json({        
          message: 'This theme not exist'
        });
      }
      res.status(200).json({
        theme: updatedDoc,
        message: 'Successfuly edit theme'
      });      
    });    
    
}
