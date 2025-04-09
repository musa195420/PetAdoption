const Joi = require("@hapi/joi");

const schema = {
  user: Joi.object({
    // Optional fields that are not in your DB can be added for frontend use, but not mandatory
    firstName: Joi.string().max(100),
    lastName: Joi.string().max(100),

    // Required fields from your DB structure
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,30}$"))
      .required()
      .messages({
        "string.pattern.base": "Password must be 6-30 characters with letters, numbers, and allowed symbols (!@#$%^&*).",
      }),
    phone_number: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        "string.pattern.base": "Invalid mobile number. Must be between 10 and 15 digits.",
      }),

    role: Joi.string().valid("Admin", "Adopter", "Donor").required(),
    device_id: Joi.string().allow(null, ""),
  }),
};

module.exports = schema;
