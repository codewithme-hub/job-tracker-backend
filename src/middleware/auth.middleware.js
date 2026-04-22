const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // ✅ GET TOKEN FROM HEADER
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ VERIFY TOKEN
    const decoded = jwt.verify(token, "secret");

    // ✅ ATTACH USER TO REQUEST
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};