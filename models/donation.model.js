const mongoose=require('mongoose');
const DonationSchema=new mongoose.Schema(
    {
        email:{
            type : String,
            trim : true,
            unique: true,
            lowercase: true
        },
        name:{
            type: String,
            trim: true
        },
        blood:{
            type: String,
            trim: true
        },
        phone:{
            type: Number,
            trim: true,
            Unique: true 
        },
        lastdonation:{
            type: Date,
            trim: true
        }
    }
)

module.exports = mongoose.model('Donor',DonationSchema);
