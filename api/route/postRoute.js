import express from "express";
import Post from "../controller/postController";
import authentication from "../middleware/auth";

const { authenticate } = authentication;

const Router = new express.Router();
Router.use(express.json());

Router.post("/post", Post.createPost);

export default Router;
