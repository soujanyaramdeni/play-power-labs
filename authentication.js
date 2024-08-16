const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    console.log("Decoded JWT:", decoded);
    next();
  });
}

module.exports = authenticateToken;
