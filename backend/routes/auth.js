const express=require('express')
const Router=express.Router()
const bcrypt=require('bcryptjs')
const User = require('../models/User.js')


//Register
Router.post('/register',async(req,res)=>{
    const {email,password}=req.body;

    const hashpass=await bcrypt.hash(password,10);

    try{
        const user=new User({email,password:hashpass});
        await user.save();
        res.status(201).json({message:'user registed'})
    }
    catch(err){
        if (err.code===11000){
            return res.status(400).json({error:'Email already exists'});
        }
        console.error(err);
        res.status(500).json({error:'server error during registration'})
    }
})

//login

Router.post('/login',async(req,res)=>{
    const{email,password}=req.body;

    const user=await User.findOne({email});
    if(!user) return res.status(4011).json({error:"invalid email"})

    const pass=await bcrypt.compare(password,user.password);
    if(!pass) return res.status(401).json({error:"invalid password"})

    res.status(201).json({message:"Login successful"})
})


//save color

Router.post('/save-color',async(req,res)=>{
    const {email,color}=req.body;

    try{
        const user= await User.findOneAndUpdate({email},{color},{new:true})
        
        if(!user){
            return res.status(404).json({error:'user not found'})
        }
        res.json({message:"color is saved"});
    }
    catch(err){
        res.status(500).json({error:"the error occured:"})
    }
})

//get color

Router.get('/getcolor/:email',async(req,res)=>{
    const email=req.params.email

    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"User id is not found"})
        res.json({color:user.color})
    }
    catch{
        res.status(400).json({message:"error occured while processing email"})
    }
})

module.exports=Router;