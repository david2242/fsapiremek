const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cause: {
    type: String,
    required: true
  },
  nature: {
    type: String,
    required: true,
  },
  location: {
    zip: String,
    city: String,
    address: String,
    floorDoor: String,
    required: false
  },
  locationCode: {
    type: String,
    required: false
  },
  public: {
    type: Boolean,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  dressCode: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
