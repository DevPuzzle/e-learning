const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  description: {
    type: String, 
    required: true,    
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  theme: [{
    type: Schema.Types.ObjectId,
    ref: 'Theme'
  }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Subcategory', subcategorySchema);