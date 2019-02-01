const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  subcategories: { 
    type: Schema.Types.ObjectId,
    ref: 'Subcategories',
    required: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

module.exports = mongoose.model('themeSchema', themeSchema);