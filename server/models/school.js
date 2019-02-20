const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  info: {
    type: String, 
    required: true,    
  },  
  image: { type: String, required: false },
  logo: { type: String, required: false },  
  course: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
});

module.exports = mongoose.model('School', courseSchema);