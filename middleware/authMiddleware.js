const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization denied, no token provided" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.secretOrKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
