const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const app=express();
const donorroutes=require('./routes/donors');
dotenv.config();
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
mongoose.connect('mongodb+srv://yogesh:yogesh@cluster0.f5dch.mongodb.net/plasma?retryWrites=true&w=majority',
{
    useNewUrlParser: true, // for removing warnings
    useFindAndModify: false,// ^
    useCreateIndex: true,  // ^
    useUnifiedTopology: true // ^  
}).then(()=>{
    console.log("connected");
});

app.use('/donors',donorroutes);
app.get('/',(req,res)=>{
    res.send('hello welcome to todoapp');
})
app.listen(6000);