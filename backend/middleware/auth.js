// middleware/auth.js
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_decode.id }; // ✅ attach userId safely here
    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
