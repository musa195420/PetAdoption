const  express =require ('express');
require ("dotenv").config();
const app = express();
const logger= require("./config/logger");
const userRouter=require("./api/users/user.router");
const adopterRouter = require("./api/adopter/adopter.router");
const donorRouter = require("./api/donor/donor.router");
const petRouter = require("./api/pet/pet.router");
const animalRouter = require("./api/animal/animal.router");
const breedRouter = require("./api/breed/breed.router");
const vaccinationRouter = require("./api/vaccination/vaccination.router");
const diseaseRouter = require("./api/disease/disease.router");
const disabilityRouter = require("./api/disability/disability.router");
const healthRouter = require("./api/health/healthinfo.router");
app.use(express.json());
app.use((req,res,next)=>{
 logger.info(req.body);
 let oldSend=res.send;
 res.send= function(data)
 {
    logger.info(JSON.parse(data));
    oldSend.apply(res,arguments);
 }
 next();
});
app.use("/api/health", healthRouter);
app.use("/api/disability", disabilityRouter);
app.use("/api/disease", diseaseRouter);
app.use("/api/vaccination", vaccinationRouter);
app.use("/api/breed", breedRouter);
app.use("/api/animal", animalRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/pet", petRouter);
app.use("/api/donor", donorRouter);
app.use("/api/adopter", adopterRouter);
app.use("/api/users",userRouter);
app.get("/api",(req,res)=>{
    res.json(
        {
            sucess:1,
            message:"This is rest apis working"
        }
    );
});

app.listen(process.env.APP_PORT,()=>{
    logger.log('info',"Server is running at :"+process.env.APP_PORT);
});