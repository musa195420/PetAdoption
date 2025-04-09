const  express =require ('express');
require ("dotenv").config();
const app = express();
const logger= require("./config/logger");
const userRouter=require("./api/users/user.router");
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

app.use("/uploads", express.static("uploads"));

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