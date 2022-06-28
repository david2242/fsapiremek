const Article = require('../../models/article.model');
const httpError = require('http-errors');

exports.create = (articleData) => {
  const article = new Article(articleData);
  return article.save()
      // .then(() => article)
      // .catch(err => next(new httpError.InternalServerError(err.message)));
}

exports.getAll = () => {
  return Article.find();
}

exports.getOne = (slug) => {
  return Article.findOne({slug: slug});
}

exports.delete = (slug) => {
  return Article.findOneAndDelete({slug: slug});
}

exports.updateOne = (slug, updateData) => {
  return Article.findOneAndUpdate({slug: slug}, updateData, {new: true})
}

exports.favoriteOne = (id) => {
  return Article.findByIdAndUpdate(id, {$inc: {'favorited': 1}});
}
exports.unfavoriteOne = (id) => {
  return Article.findByIdAndUpdate(id, {$inc: {'favorited': -1}});
}
