const mongoose = require('mongoose');

const Subcategory = require('../models/subcategory');
const Theme = require('../models/theme');

exports.theme_create = (req, res, next) => {
  const themename = req.body.themename;
  const subcat_id = req.body.subcat_id;

  theme = new Theme({
    _id: new mongoose.Types.ObjectId(),
      name: themename,
      subcategory: subcat_id
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
            message: 'Subcategory get theme!!!'
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
          message: 'Not exist doc fuck it'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    }); 
}  

exports.theme_get = (req, res, next) => {
  const themename = req.params.themename;
  console.log('GET THEME', themename);

  Theme.findOne({name: themename})
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

  Theme.findOneAndDelete({name: req.params.themename})
    .exec()
    .then(doc => {
      if(doc) {
        const theme_id = doc._id;
        const subcat_id = doc.subcategory

        Subcategory.update({_id: subcat_id},
          {
            $pull: {theme: {$in: [theme_id] }}
          })
          .exec()
          .then(result => {
            console.log(result);
            res.status(200).json({
              message: "Successfuly theme delete  and subcategory update"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              message: "Error find subcategory fuck",
              error: err
            });
          });    
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