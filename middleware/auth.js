// middleware is a function that has access to the req and response objects, so when we hit an endpoint we can fire off this middleware and check to see if there is a token in the header. The key to the token inside of the header is 'x-auth-token'.

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  try {
    // If there is a token, we verify it, then pull out the payload, and set the user in that payload to req.user so that we'll have access to req.user inside the protected route.
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Assign user to req object
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
