// validators/contactValidator.js
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),
  phone: Joi.string().pattern(/^\+?\d{10,15}$/).required().messages({
    "string.pattern.base": "Phone number is invalid",
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),
});

module.exports = contactSchema;
