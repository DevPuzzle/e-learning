const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
  userImage: { type: String, required: false},
  password: { type: String, required: true },
  
},
{ versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
