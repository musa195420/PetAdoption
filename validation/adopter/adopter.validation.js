const {adopter}= require("./adopter.schema");
module.exports ={
    addAdoptionValdation:async(req,res,next)=>
        {
            const value= await adopter.validate(req.body);
            if(value.error)
            {
                res.json(
                    {
                        success:false,
                        status:400,
                        message:value.error.details[0].message
                    }
                )
            }else{
                next();
            }
        }
}