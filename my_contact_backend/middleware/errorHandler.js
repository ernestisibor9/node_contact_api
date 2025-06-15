const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle MongoDB network errors
  if (err.name === "MongoServerSelectionError" || err.message.includes("getaddrinfo ENOTFOUND")) {
    statusCode = 503;
    message = "Database connection failed. Please check your internet connection.";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
