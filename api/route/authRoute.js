import express from "express";
import User from "../controller/userController";
import authentication from "../middleware/auth";

const { authenticate } = authentication;

const Router = new express.Router();
Router.use(express.json());

Router.put("/signup", User.createUser);

Router.post("/testing", (req, res) => {
  res.send("Hello People!");
});

Router.post("/login", User.loginUser);

Router.get("/profile", authenticate, User.protectedRoute);

export default Router;
