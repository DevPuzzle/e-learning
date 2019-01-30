const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  image: String,
  video: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Course', courseSchema);