const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  title: {
    type: 'string',
    required: true,
    trim: true,
  },
  desc: {
    type: 'string',
    required: false,
    trim: true,
  },
  completed: {
    type: 'boolean',
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
