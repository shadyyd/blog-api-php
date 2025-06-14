const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Failure",
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      status: "Failure",
      message: `This ${Object.keys(err.keyValue)[0]} is already taken`,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "Failure",
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "Failure",
      message: `Cast error for ${err.path}: ${err.value}`,
    });
  }

  if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError" ||
    err.name === "NotBeforeError"
  ) {
    return res.status(401).json({
      status: "Failure",
      message: "Unauthorized",
    });
  }

  res.status(500).json({
    status: "Failure",
    message: "Somthing Went Wrong",
  });
};
