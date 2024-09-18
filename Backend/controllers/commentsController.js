const express = require('express');
const router = express.Router();
const Comments = require('../models/commentModel.js');
const Answers = require('../models/answerModel.js');

// Post a comment to an answer (User)
exports.createComment = async (req, res) => {
  try {
    const answer = await Answers.findById(req.params.ansid);

    if (!answer || !answer.isapproved) {
      return res.status(404).send({ message: 'Answer not found or not accessible' });
    }

    const comment = new Comments({
      comment: req.body.comment,
      answerId: req.params.ansid,
      userId: req.user.id,
    });

    await comment.save();

    res.status(201).send({ message: 'Comment added', comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllCommentsForAnswer = async (req, res) => {
  try {
    const comments = await Comments.find({
      answerId: req.params.ansid,
    });

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comments.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }
    res.status(200).send({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

