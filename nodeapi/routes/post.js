const express=require('express');
const router=express.Router();


const{getPost,createPost, postsByUser,postById,isPoster,updatePost,deletePost}=require('../controller/post');
const{requiredSignin}=require('../controller/auth');
const {userById}=require('../controller/user');

router.get('/',requiredSignin,getPost);
router.post('/post/new/:UserId',requiredSignin,createPost);
router.get('/posts/by/:UserId',requiredSignin,postsByUser);
router.delete('/post/:PostId',requiredSignin,isPoster,deletePost);
router.put('/post/:PostId',requiredSignin,isPoster,updatePost);
router.param('UserId',userById);
router.param('PostId',postById);

module.exports=router;

