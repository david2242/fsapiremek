const mongoose = require('mongoose');
const slugify = require('slugify')
const Comment = require('./comment.model').schema;

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: [String],
    required: false
  },
  slug: {
    type: String
  },
  favoriteCount: {
    type: Number,
    required: true,
    default: 0
  },
  author: {
    type: String,
    required: false
  },
  comments: {
    type: Comment
  }
  // comments: {
  //   type: String,
  //   required: false
  // }
}, {timestamps: true});

ArticleSchema.pre('save', function(next) {
  this.slug = this._id+'-'+slugify(this.title);
  next();
});

module.exports = mongoose.model('Article', ArticleSchema);
