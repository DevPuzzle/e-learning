const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,  
  code: {
    type: String, 
    required: true, 
    unique: true
  },  
  user_id: {
    type: Number,
    require: true,
    unique: true
  },
  }, { versionKey: false }  
);

module.exports = mongoose.model('UserVerify', userSchema);
