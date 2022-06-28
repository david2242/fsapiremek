const User = require('../../models/user.model');

exports.create = userData => {
  const user = new User(userData);
  return user.save();
}

// exports.getOne = id => User.findById(id);
exports.getOneByEmail = email => User.findOne({email: email});

exports.getAll = () => User.find({});

exports.delete = email => User.findOneAndDelete({email: email});

exports.update = (email, userUpdate) => {
  return User.findOneAndUpdate({email: email}, userUpdate, {new: true,})
};
