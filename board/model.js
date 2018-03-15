const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lists: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Board', BoardSchema);
