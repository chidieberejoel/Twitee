import express from "express";
import path from "path";
import passport from "passport";
import bodyParser from "body-parser";
import multer from "multer";
import loader from "./loaders";
import Database from "./config/dbConnection";
import logger from "./config/winstonlog";
import authRouter from "./route/authRoute";
import postRouter from "./route/postRoute";
import UserModel from "./model/user";
import PostModel from "./model/post";
import "./service/passport-local";

const app = express();

// Pass the global passport object into the configuration function
require("./config/passport")(passport);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png"
    || file.mimetype === "image/jpg"
    || file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter }).single("image"),
);
app.use("/images", express.static(path.join(__dirname, "images")));

PostModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(PostModel);

Database.authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch((err) => {
    logger.info("Unable to connect to the database:", err);
  });

Database.sync();

// Initialize app with dependencies and error handlers
loader.init(app);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Initialize passport
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/feed", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
