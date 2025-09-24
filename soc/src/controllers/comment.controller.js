import * as commentService from '../services/comment.service.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const getAllComments = asyncHandler(async (_req, res) => {
  const comments = await commentService.getAllComments();
  res
    .status(200)
    .json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new ApiError(400, 'Invalid post id');
  }
  const comments = await commentService.getCommentsByPostId(postId);
  res
    .status(200)
    .json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

export const createComment = asyncHandler(async (req, res) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new ApiError(400, 'Invalid post id');
  }

  const { text, authorId } = req.body ?? {};
  const numericAuthorId = Number(authorId);
  if (!Number.isInteger(numericAuthorId) || numericAuthorId <= 0) {
    throw new ApiError(400, 'Invalid authorId');
  }

  const created = await commentService.createComment(postId, {
    text,
    authorId: numericAuthorId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, created, 'Comment created successfully'));
});
