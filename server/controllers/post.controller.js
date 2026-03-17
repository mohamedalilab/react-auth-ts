const asyncFunction = require("../middlewares/asyncFunction");
const Post = require("../models/Post");
const User = require("../models/User");

// 1) get all posts:
const getAllPosts = asyncFunction(async (req, res) => {
  const allPosts = await Post.find({})
    .select({ __v: 0 })
    .sort({ createdAt: -1 })
    .exec();

  // Transform to match frontend format
  const formattedPosts = allPosts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    authorId: post.authorId,
    authorName: post.authorName || "Unknown",
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  res.json(formattedPosts);
});

// 2) get post by id:
const getPost = asyncFunction(async (req, res) => {
  const postId = req.params.id;
  const foundPost = await Post.findById(postId).exec();

  if (!foundPost) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // Transform to match frontend format
  res.json({
    id: foundPost._id.toString(),
    title: foundPost.title,
    content: foundPost.content,
    authorId: foundPost.authorId,
    authorName: foundPost.authorName || "Unknown",
    createdAt: foundPost.createdAt.toISOString(),
    updatedAt: foundPost.updatedAt.toISOString(),
  });
});

// 3) create new post:
const addNewPost = asyncFunction(async (req, res) => {
  // Get user info from JWT token (set by verifyMWToken middleware)
  const userId = req.userId;
  const userName = req.userName;

  // Find user to get name:
  const foundUser = await User.findById(userId).exec();
  if (!foundUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  // Create post:
  const newPost = await Post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: userId,
    authorName: foundUser.name,
  });

  // Transform to match frontend format
  res.status(201).json({
    id: newPost._id.toString(),
    title: newPost.title,
    content: newPost.content,
    authorId: newPost.authorId,
    authorName: newPost.authorName,
    createdAt: newPost.createdAt.toISOString(),
    updatedAt: newPost.updatedAt.toISOString(),
  });
});

// 4) update post:
const updatePost = asyncFunction(async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  const userRole = req.userRole;

  // Find post:
  const foundPost = await Post.findById(postId).exec();
  if (!foundPost) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // Check if user owns the post or is admin:
  if (foundPost.authorId !== userId && userRole !== "admin") {
    return res.status(403).json({ message: "You don't have permission to edit this post!" });
  }

  // Update post:
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true, runValidators: true }
  ).exec();

  // Transform to match frontend format
  res.json({
    id: updatedPost._id.toString(),
    title: updatedPost.title,
    content: updatedPost.content,
    authorId: updatedPost.authorId,
    authorName: updatedPost.authorName || "Unknown",
    createdAt: updatedPost.createdAt.toISOString(),
    updatedAt: updatedPost.updatedAt.toISOString(),
  });
});

// 5) delete post:
const deletePost = asyncFunction(async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  const userRole = req.userRole;

  // Find post:
  const foundPost = await Post.findById(postId).exec();
  if (!foundPost) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // Check if user owns the post or is admin:
  if (foundPost.authorId !== userId && userRole !== "admin") {
    return res.status(403).json({ message: "You don't have permission to delete this post!" });
  }

  // Delete post:
  await Post.deleteOne({ _id: postId });

  res.status(204).send();
});

module.exports = {
  getAllPosts,
  getPost,
  addNewPost,
  updatePost,
  deletePost,
};
