const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
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
  subcategory: { 
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true
  },
  course: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  url: {
    type: String, 
    required: true, 
    unique: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Theme', themeSchema);