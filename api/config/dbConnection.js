import Sequelize from "sequelize";
import config from "./index";

const sequelize = new Sequelize(config.db, config.user, config.password, {
  dialect: config.dialect,
  host: config.host,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

module.exports = sequelize;
