const express=require('express');
const app=express();
const morgan=require('morgan');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
dotenv.config();

//db
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }  
    ).then(()=>console.log("DB connected"),(err)=>console.log("error happened! "+ err));

mongoose.connection.on("error",err=>{
    console.log("the error is "+ err.message);
});

//importing routes...
const postRouter=require('./routes/post');
const authRouter=require('./routes/auth');
const userRouter=require('./routes/user');

//using middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/',authRouter);
app.use('/',postRouter);
app.use('/',userRouter);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({message:'error!'});
    }
  });

const PORT=process.env.PORT||8080;
app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));