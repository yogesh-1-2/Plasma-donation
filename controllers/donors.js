const mongoose=require('mongoose');
const Volun=require('../models/donation.model');
const donors=async (req,res)=>{
    try{
        const volunteers=await Volun.find();
        res.status(200).json(volunteers); 
    }catch(err){
        res.status(404).json({error: err.message})
    }
}
const createdonors=async (req,res)=>{
    const volunteer=new Volun(req.body)
    try{
        await volunteer.save();
        res.status(201).json(volunteer);
    }catch(err){
        res.status(404).json({error: err.message})
    }
}
module.exports={donors,createdonors};