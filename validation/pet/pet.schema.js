const Joi = require("@hapi/joi");

const petSchema = {
    pet:Joi.object({
    donor_id: Joi.string().required(),
    name: Joi.string().max(255).required(),
    animal_type: Joi.string().required(),
    breed_id: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
    gender: Joi.string().valid("Male", "Female").required(),
    description: Joi.string().allow("").max(1000),
    is_approved: Joi.string().valid("Pending", "Approved", "Rejected").default("Pending"),
    rejection_reason: Joi.string().allow(null, "").optional(),
    is_live: Joi.boolean().default(false)
})};

module.exports =  petSchema ;
