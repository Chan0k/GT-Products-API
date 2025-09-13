// src/controllers/post.controller.js
import * as postService from '../services/post.service.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid id parameter' });
    }
    const post = await postService.getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post', error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }
    const newPost = await postService.createPost({ title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid id parameter' });
    }
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required for update.' });
    }
    const updated = await postService.updatePost(id, { title, content });
    if (!updated) return res.status(404).json({ message: 'Post not found.' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

export const partiallyUpdatePost = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid id parameter' });
    }

    // Only allow known fields (keeps things predictable)
    const allowed = ['title', 'content'];
    const updates = Object.fromEntries(
      Object.entries(req.body || {}).filter(([k]) => allowed.includes(k))
    );

    if (Object.keys(updates).length === 0) {
      // No changes provided: return current resource (or 400 if you prefer)
      const current = await postService.getPostById(id);
      if (!current) return res.status(404).json({ message: 'Post not found.' });
      return res.json(current);
    }

    const patched = await postService.partiallyUpdatePost(id, updates);
    if (!patched) return res.status(404).json({ message: 'Post not found.' });
    res.json(patched);
  } catch (error) {
    res.status(500).json({ message: 'Error partially updating post', error: error.message });
  }
};

// Alias for compatibility if your routes still import patchPost
export const patchPost = partiallyUpdatePost;

export const deletePost = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid id parameter' });
    }
    const success = await postService.deletePost(id);
    if (!success) return res.status(404).json({ message: 'Post not found.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
