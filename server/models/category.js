const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  subcategory: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Subcategory'
  }], 
  course: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]

});

module.exports = mongoose.model('Category', categorySchema);