const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
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
  subcategory: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Subcategory'
  }], 
  course: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]

},
{
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);