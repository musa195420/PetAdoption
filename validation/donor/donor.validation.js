const {donor}= require("./donor.schema");
module.exports ={
    addDonorValdation:async(req,res,next)=>
        {
            const value= await donor.validate(req.body);
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