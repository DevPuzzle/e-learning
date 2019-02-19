const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  info: {
    type: String, 
    required: true,    
  },
  description: {
    type: String, 
    required: true,    
  },
  image: { type: String, required: false},
  video: { type: String, required: false},
  theme: {
    type: Schema.Types.ObjectId,
    ref: 'Theme'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Course', courseSchema);