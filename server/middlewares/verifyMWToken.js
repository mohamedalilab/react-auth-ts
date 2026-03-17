const jwt = require("jsonwebtoken");
const asyncFunction = require("./asyncFunction");

const verifyMWToken = asyncFunction(async (req, res, nxt) => {
  // 1. get accessToken from Authorization header (Bearer token)
  let authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found!" });
  }
  
  let accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ message: "Token not found!" });
  }

  // 2. verify token:
  jwt.verify(accessToken, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid access token!" });
    }
    // 3. store user info in request:
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userName = decoded.name;
    req.userRole = decoded.role;
    nxt();
  });
});

module.exports = verifyMWToken;
