const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answers',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  }
});

const Comments=mongoose.model('Comments', commentSchema);

module.exports = Comments;