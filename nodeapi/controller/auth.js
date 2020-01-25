const User=require('../models/user');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');

exports.signup=async(req,res)=>{
    const userExists=await User.findOne({email:req.body.email});
    if(userExists){
        res.status(403).json({error:"Email taken"});
    }
    const user=new User(req.body);
    user.save();
    res.status(200).json({message:"sign up successful... go forward with logging in"});

}
exports.signin=(req,res)=>{
    const {email,password}=req.body;
    
    User.findOne({email},(err,user)=>{        
        if(err|| !user){
            console.log("error---1 "+err);
            return res.status(401).json({error:"User with that email doesn't exit. please sign in"});
        }
        if(!user.authenticate(password)){
            console.log("error---2");
            return res.status(401).json({error:"User id and password donot match"});
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
        res.cookie("t",token);
        const {_id,name,email}=user;
        return res.json({token,User:{_id,name,email}});

    });
}

exports.signout=function(req,res){
    res.clearCookie("t");
    res.json({message:"successfully logged out"});
}
exports.requiredSignin=expressJwt(
    {
        secret:process.env.JWT_SECRET,
        userProperty:'auth'
    }
)