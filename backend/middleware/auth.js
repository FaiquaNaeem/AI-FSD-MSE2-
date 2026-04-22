// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  // handle both formats
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // IMPORTANT FIX 👇
    req.user = decoded;   // contains { id: ... }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};