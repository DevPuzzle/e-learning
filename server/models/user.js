const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: {
    type: String, 
    required: true,  
  },
  last_name: {
    type: String, 
    required: true,  
  },
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  active: {
    type: Boolean
  },
  status: {
    type: String, required: true
  },
  userImage: { type: String, required: false},
  password: { type: String, required: true },  
  
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],

  }, { versionKey: false }
  
);

module.exports = mongoose.model('User', userSchema);
