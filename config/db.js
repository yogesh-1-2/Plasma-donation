const mongoose=require('mongoose');
const connectDB= async()=>{
    const connection = await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true, // for removing warnings
        useFindAndModify: false,// ^
        useCreateIndex: true,  // ^
        useUnifiedTopology: true // ^
    });
    console.log(`Mongo DB connect ${connection.connection.host}`);
}
module.exports = connectDB;