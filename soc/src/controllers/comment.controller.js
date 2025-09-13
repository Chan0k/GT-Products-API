import * as commentService from '../services/comment.service.js';

export const getAllComments = (req, res) => {
  res.json(commentService.getAllComments());
};

export const getCommentsByPostId = (req, res) => {
  const postId = Number(req.params.postId);
  res.json(commentService.getCommentsByPostId(postId));
};

export const createComment = (req, res) => {
  const postId = Number(req.params.postId);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const comment = commentService.createComment(postId, text);
  if (!comment) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(201).json(comment);
};
