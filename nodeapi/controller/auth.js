const User=require('../models/user');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');

/*
JWT authentication Vs Session Based Authentication

JWT authentication is STATELESS, which means:-
That server doesn't store details about the client, and the two requests are treated as if they are completely 
independent.

A JWT token consists of three parts (separated with dots) = header.payload.signature
    
    1) Header - It defines the cryptographic algorithm used for signature, JWT support both symmetric and assymmetric encryption.
                Header is not encrypted and simply base64 encoded.
    2) Payload - It consists of some data, it could be the authority of the user or time till token is valid etc.
                It also just encoded, and thus should not included any secret or credentials.
    3) Signature - The signature is used to verify the message wasn't changed along the way. 
                In the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.
                signature=hash(Header+Payload+SECRET)

flow of execution:-
1) Users sends username, pswd upon authentication server responds by creating cookie that stores jwt token.
2) For subsequent requests, this token sent to server, where it validates this token.
3) This prevents requiring users from signing again.
4) On logout, this cookie containing token is cleared from broswer's local storage.

Session based authentication is STATEFULL, which means:-

That server stores some details related to client and creates a session to capture the state of user on some cache or database.
This session is uniquely identified with a sessionID, which is provided as a cookie by server to the User.

Flow of execution:-
1) Users sends username, pswd upon authentication server creates a session for client and responds by creating a cookie containing sessionID.
2) For subsequent requests this token sent to server, where the server can restore the session based on sessionID
3) On logout, this cookie containing sessionID is cleared from broswer's local storage.

*/

exports.signup=async(req,res)=>{
    const userExists=await User.findOne({email:req.body.email});
    if(userExists){
        return res.status(403).json({error:"Email taken"});
    }
    const user=await new User(req.body);
    await user.save();
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