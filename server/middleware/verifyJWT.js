import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verify error:", err);
      return res.status(401).json({ error: "Unauthorized: Invalid token." });
    }

    req.user = decoded;
    next();
  });
};
