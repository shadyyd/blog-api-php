class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // copy stack trace from the orignal error
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
