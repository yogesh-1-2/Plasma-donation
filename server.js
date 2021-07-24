const express=require('express');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const cors=require('cors');
const connectDB=require('./config/db');
const app=express();

//config environment
require('dotenv').config({
    path: './config/config.env'
})

// connect to database
connectDB();

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(morgan('dev'));

const authRouter=require('./routes/auth.route');

app.use('/api/',authRouter);

app.use((req,res,next)=>{
    res.status(404).json({
        sucess: false,
        message: "page not found"
    })
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`the server is running on ${PORT}`);
});