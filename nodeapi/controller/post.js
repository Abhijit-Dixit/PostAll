const Post=require('../models/post');
const formidable=require('formidable');
const fs=require('fs');
const _=require('lodash');

exports.getPost=(req,res)=>{
    const posts=Post.find().populate("postedBy","name _id")
    .then(posts=>{
        res.status(200).json({posts});
    })
    .catch(err=>console.log(err));
}

exports.createPost=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"Image could not be uploaded"
            });
        }
        let post=new Post(fields);
        req.profile.salt=undefined;
        req.profile.hashed_password=undefined;
        post.postedBy=req.profile;
        if(files.photo){
            post.photo.data=fs.readFileSync(files.photo.path);
            post.photo.contentType=files.photo.type;
        }
        post.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            res.json(result);
        });
    })
}

exports.postsByUser=(req,res)=>{
    Post.find({'postedBy':req.profile._id})
    .populate("postedBy",'_id name')
    .sort('created')
    .exec((err,posts)=>{
        if(err){
            return res.json({error: err});
        }
        res.json({posts});


    })
}

exports.postById=(req,res,next,id)=>{
    //console.log("running");
    Post.findById(id).populate('postedBy','_id name')
    .exec((err,post)=>{
        //console.log("kilo"); 
        if(err||!post){
            return res.json({
                error:err
            });
        }
        req.post=post;
        //console.log(req.post);
        next();
    })

}

exports.isPoster=(req,res,next)=>{
    
    let isPoster=req.post && req.auth && req.post.postedBy._id==req.auth._id;
    if(!isPoster){
        return res.status(403).json({message:'unauthorized access denied'});
    };
    console.log('done');
    next();
}


exports.deletePost=(req,res,next)=>{
    let post=req.post;
    post.remove((err)=>{
        if(err){
            return res.status(403).json({error:'cannot delete post'});
        }
        res.json({message:'successfully removed post by user'});
    });
    
}

exports.updatePost=(req,res,next)=>{
    let post=req.post;
    post=_.extend(post,req.body);
    post.updated=Date.now();
    console.log('done');
    post.save((err)=>{
        if(err){
            console.log("error happened "+err);
        }
        res.json({post});
    });
    console.log('done');
}