 import express from "express";

import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controller/postController.js";
import { validatePost } from "../middlewares/validatePost.js";

const router = express.Router();

router.post("/posts", validatePost, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", validatePost, updatePost);
router.delete("/posts/:id", deletePost);

export default router;
