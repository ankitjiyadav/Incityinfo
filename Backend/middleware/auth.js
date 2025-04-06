const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // ✅ Move role check *inside* the try block
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT verification error:", err.message);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = auth;
