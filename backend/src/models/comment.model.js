const mongoose = require('mongoose');
const User = require('./user.model').schema;

const CommentSchema = new mongoose.Schema({
  author: {
    type: User,
    required: true
  },
  createdAt: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  }
}, {timestamps: true});


module.exports = mongoose.model('Comment', CommentSchema);
