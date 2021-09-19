const express=require('express');
const {allUsers,userById,getUser,updateUser,deleteUser,hasAuthorization, userPhoto, addFollowing, addFollower,
        removeFollower,removeFollowing}=require('../controller/user');
const {requiredSignin}=require('../controller/auth')
const router=express.Router();


router.get('/users',allUsers);
router.get('/users/:userId',requiredSignin,getUser);
router.put('/users/:userId',requiredSignin,updateUser);
router.delete('/users/:userId',requiredSignin,hasAuthorization,deleteUser);
// photo
router.get("/user/photo/:userId",userPhoto);
//
router.put("/user/follow",requiredSignin,addFollowing,addFollower);
router.pus("user/unfollow",requiredSignin,removeFollowing,removeFollower);
// any route containing :userId, our app will first execute userByID()
router.param('userId',userById);

module.exports=router;