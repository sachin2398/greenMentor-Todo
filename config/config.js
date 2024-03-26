
require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  port: process.env.PORT || 8080,
};
