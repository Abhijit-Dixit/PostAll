const User=require('../models/user');
const _=require('lodash');
const formidable = require('formidable');
const fs = require('fs');


exports.userById=(req,res,next,id)=>{
    User.findById(id)
    .populate('following','_id name')
    .populate('followers','_id name')
    .exec((err,user)=>{
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

// exports.updateUser=(req,res,next)=>{
//     let user=req.profile;
//     console.log("arrreey")
//     user=_.extend(user,req.body);
//     user.updated=Date.now();
//     user.save((err)=>{
//         if(err){
//             console.log("error happened ! "+err);
//         }
//         req.profile.hashed_password=undefined;
//         req.profile.salt=undefined;
//         res.json({user});

//     });

// }

exports.updateUser = (req,res,next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }

        // save user
        let user = req.profile
        user = _.extend(user,fields)
        user.updated =Date.now();

        if(files.photo){
            user.photo.data=fs.readFileSync(files.photo.path)
            user.photo.contentType=files.photo.type
        }

        user.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            user.hashed_password=undefined;
            user.salt=undefined;
            res.json(user);
        })

    })
}

exports.userPhoto = (req,res,next)=>{
    if(req.profile.photo.data){
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data);
    }
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

exports.addFollowing=(req,res,next)=>{
    User.findByIdAndUpdate(req.body.userId,{$push:{following: req.body.followId}},(err,result)=>{
        if(err){
            res.status(400).json({error:err});
        }
        next();
    })
}

exports.addFollower=(req,res,next)=>{
    User.findByIdAndUpdate(req.body.followId,{$push:{followers: req.body.UserId}},{new:true})
    .populate("following","_id name")  
    .populate("followers","_id name")
    .exec((err,result)=>{
        if(err){
            res.status(400).json({error:err});
        }
        result.hashed_password=undefined;
        result.salt=undefined;
        res.status(200).json(result);
    });
    
}

exports.removeFollowing=(req,res,next)=>{
    User.findByIdAndUpdate(req.body.userId,{$pull:{following: req.body.unfollowId}},(err,result)=>{
        if(err){
            res.status(400).json({error:err});
        }
        next();
    })
}

exports.removeFollower=(req,res,next)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{$pull:{followers: req.body.UserId}},{new:true})
    .populate("following","_id name")  
    .populate("followers","_id name")
    .exec((err,result)=>{
        if(err){
            res.status(400).json({error:err});
        }
        result.hashed_password=undefined;
        result.salt=undefined;
        res.status(200).json(result);
    });
    
}