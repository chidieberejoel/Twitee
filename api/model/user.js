import Sequelize from "sequelize";

import sequelize from "../config/dbConnection";

const User = sequelize.define("User", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // post: {
  //   type: Sequelize.STRING,
  //   allowNull: true,
  // get() {
  //   return JSON.parse(this.getDataValue("categories"));
  // },
  // set(val) {
  //   return this.setDataValue("categories", JSON.stringify(val));
  // },
  // references: {
  //   model: "Post",
  //   key: "id",
  // },
  // },
});

module.exports = User;
