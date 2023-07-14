import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers['token'];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decodedToken = jwt.verify(token, "ego");
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
