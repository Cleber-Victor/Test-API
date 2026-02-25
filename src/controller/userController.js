import {
  createPostService,
  deletePostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
} from "../models/userModel.js";

const handlerResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createPost = async (req, res, next) => {
  const { title, body } = req.body;
  try {
    const newPost = await createPostService(title, body);
    handlerResponse(ResizeObserver, 201, "Post created", newPost);
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await getAllPostsService();
    handlerResponse(res, 200, "posts fetched", posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const posts = await getPostByIdService(req.params.id);
    if (!user) return handlerResponse(res, 404, "User not found");
    handlerResponse(res, 200, "post fetched", posts);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await updatePostService(req.params.id, title);
    if (!user) return handlerResponse(res, 404, "User not found");
    handlerResponse(res, 200, "post updated", updatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await deletePostService(req.params.id);
    if (!user) return handlerResponse(res, 404, "User not found");
    handlerResponse(res, 200, "post deleted", deletedPost);
  } catch (err) {
    next(err);
  }
};
