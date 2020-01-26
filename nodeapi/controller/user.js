const User=require('../models/user');
const _=require('lodash');
exports.userById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(404).json({
                error:"user not found"
            })
        }
        req.profile=user;
        next();
    })
}

exports.hasAuthorization=(req,res,next)=>{
    if(!(req.profile && req.auth && req.auth._id==req.profile._id)){
        res.status(403).json({error: 'user not authorized to perform this action'});
    };
    next();
}

exports.allUsers=(req,res)=>{
    User.find((err,users)=>{
        if(err){
            return res.status(400).json({error:err});
        }
        res.json(users);
    }).select("name email created updated");
}

exports.getUser=(req,res)=>{
    req.profile.hashed_password=undefined;
    req.profile.salt=undefined;
    return res.json(req.profile);
}

exports.updateUser=(req,res,next)=>{
    let user=req.profile;
    user=_.extend(user,req.body);
    user.updated=Date.now();
    user.save((err)=>{
        if(err){
            console.log("error happened ! "+err);
        }
        req.profile.hashed_password=undefined;
        req.profile.salt=undefined;
        res.json({user});

    });

}
exports.deleteUser=(req,res,next)=>{
    let user=req.profile;
    user.remove((err)=>{
        if(err){
            console.log("error happened! "+err);
        }
        res.json({message:"user successfully deleted"});
    });
}