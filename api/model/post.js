import Sequelize from "sequelize";

import sequelize from "../config/dbConnection";

const Post = sequelize.define("Post", {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creator: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Post;
