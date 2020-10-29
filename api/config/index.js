import dotenv from "dotenv";

dotenv.config();

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  nodeEnv: process.env.NODE_ENV,
  user: process.env.USER,
  password: process.env.PASSWORD,
  db: process.env.DB,
  dialect: process.env.DIALECT,
  PRIV_KEY: process.env.PRIV_KEY.replace(/\s\s/g, "\n"),
  PUB_KEY: process.env.PUB_KEY.replace(/\s\s/g, "\n"),
  pool: {
    max: parseInt(process.env.max, 10),
    min: parseInt(process.env.min, 10),
    acquire: parseInt(process.env.acquire, 10),
    idle: parseInt(process.env.idle, 10),
  },
};
