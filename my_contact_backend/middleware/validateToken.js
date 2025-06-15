const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Get the token part

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded.user; // Attach user to request
      next(); // Proceed to next middleware or route
    } catch (err) {
      const error = new Error("User not authorized, token failed");
      error.statusCode = 401;
      return next(error);
    }
  } else {
    const error = new Error("No token provided");
    error.statusCode = 401;
    return next(error);
  }
};

module.exports = validateToken;
