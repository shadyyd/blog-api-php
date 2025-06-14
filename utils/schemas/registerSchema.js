const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 20 characters long",
    "string.base": "Name must be a string",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email address",
    "string.base": "Email must be a string",
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.required": "Confirm password is required",
    "any.only": "Passwords do not match",
    "string.base": "Confirm password must be a string",
  }),
});

module.exports = registerSchema;
