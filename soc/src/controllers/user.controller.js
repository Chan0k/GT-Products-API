
import * as userService from '../services/user.service.js'
import * as postService from '../services/post.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';


export const getAllUsers = async (req, res) => {
  try {
    const posts = await userService.getAllUsers();
    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Users retrieved successfully"));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

export const getUserById = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const post = await userService.getUserById(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, post, "User retrieved successfully"));
});


export const getPostsByUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.userId);
  if (!Number.isInteger(userId) || userId <= 0) throw new ApiError(400, 'Invalid user id');

  const posts = await postService.getPostsByAuthorId(userId);
  res.status(200).json(new ApiResponse(200, posts, 'Posts retrieved successfully'));
});

export const createUser = async (req, res) => {
   try {
        const newUser = await userService.createUser(req.body);
        return res
            .status(201)
            .json(new ApiResponse(201, newUser, "User created successfully"));
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

