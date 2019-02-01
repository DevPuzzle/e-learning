const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  themes: [{
    type: Schema.Types.ObjectId,
    ref: 'Theme'
  }]
});

module.exports = mongoose.model('Subcategory', subcategorySchema);