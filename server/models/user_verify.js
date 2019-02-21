const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,  
  code: {
    type: String, 
    required: false, 
    unique: true
  },  
  user_id: {
    type: String,
    require: true,
    unique: true
  },
  }, 
  { versionKey: false 
  },  
  {
    timestamps: true
  });

module.exports = mongoose.model('UserVerify', userSchema);
