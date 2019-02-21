const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true,    
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);