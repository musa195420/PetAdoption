const { pet} =require("./pet.schema");

const addPetValidation = async(req, res, next) => {
    {
        const value= await pet.validate(req.body);
        if(value.error)
        {
            res.json(
                {
                    success:0,
                    message:value.error.details[0].message
                }
            )
        }else{
            next();
        }
    }
};

module.exports = { addPetValidation };