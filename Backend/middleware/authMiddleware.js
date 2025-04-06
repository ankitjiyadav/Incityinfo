const jwt = require("jsonwebtoken");
const User = require("../modele/models");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  return res.status(403).json({ error: "Access denied" });
};
