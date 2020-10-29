/* eslint-disable class-methods-use-this */
import path from "path";
import logger from "../config/winstonlog";
import PostModel from "../model/post";
import UserModel from "../model/user";

exports.createPost = async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const { title } = req.body;
  const { content } = req.body;
  let creator;

  const entry = {
    title,
    content,
    imageUrl,
    creator: req.userId,
  };

  const newPost = await PostModel.create(entry);

  newPost
    .then((result) => UserModel.findByPk(req.userId))
    .then((user) => {
      creator = user;
      return user.posts.push(newPost);
    })
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: newPost,
        creator: { id: creator.id, name: creator.name },
      });
      logger.info("New Post Created!");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
