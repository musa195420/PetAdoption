const Joi = require("@hapi/joi");

const adopterSchema = {
  adopter:Joi.object({
  adopter_id: Joi.string().required(), // must exist in Users
  name: Joi.string().max(100).required(),
  location: Joi.string().max(255).required(),
  is_active: Joi.boolean().required()
})};

module.exports = 
  adopterSchema;
