const Joi = require("@hapi/joi");

const donorSchema = {
  donor:Joi.object({
  donor_id: Joi.string().required(), // must exist in Users
  name: Joi.string().max(100).required(),
  location: Joi.string().max(255).required(),
  is_active: Joi.boolean().required()
})};

module.exports = 
donorSchema;
