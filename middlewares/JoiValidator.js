const AppError = require("../utils/AppError");

const JoiValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      const errMsg = error.details[0].message;
      throw new AppError(errMsg, 400);
    }
    next();
  };
};

module.exports = JoiValidator;
