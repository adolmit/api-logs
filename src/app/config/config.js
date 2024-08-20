import dotenv from "dotenv";

dotenv.config();
const config = {
  port: process.env.port || 5000,
};

module.exports = { config };
