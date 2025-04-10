const { petSchema} =require("./pet.schema");

const addPetValidation = (req, res, next) => {
    const { error } = petSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: 0, message: error.details[0].message });
    }
    next();
};

module.exports = { addPetValidation };