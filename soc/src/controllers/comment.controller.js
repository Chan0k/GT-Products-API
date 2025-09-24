// src/controllers/comment.controller.js
import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/ApiError.js';

const parseId = (v, name = 'id') => {
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0) throw new ApiError(400, `Invalid ${name}`);
  return n;
};

export const getAllComments = asyncHandler(async (_req, res) => {
  const comments = await commentService.getAllComments();
  return res
    .status(200)
    .json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
  const postId = parseId(req.params.postId, 'postId');
  const comments = await commentService.getCommentsByPostId(postId);
  return res
    .status(200)
    .json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
  const postId = parseId(req.params.postId, 'postId');
  const { text, authorId } = req.body ?? {};
  const created = await commentService.createComment(postId, { text, authorId });
  return res
    .status(201)
    .json(new ApiResponse(201, created, 'Comment created successfully'));
});

export const createComment = createCommentForPost;
