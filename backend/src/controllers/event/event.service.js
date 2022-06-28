const Event = require('../../models/event.model');

exports.create = eventData => {
  const event = new Event(eventData);
  return event.save();
}

exports.getAll = () => Event.find({});

// exports.getOne = id => Event.findById(id);
exports.getOne = id => Event.findOne({_id: id});

exports.delete = id => Event.findByIdAndRemove(id);

exports.update = (id, eventUpdate) => Event.findByIdAndUpdate(id, eventUpdate, {new: true, });
