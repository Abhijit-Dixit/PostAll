const express=require('express');
const {allUsers,userById,getUser,updateUser,deleteUser,hasAuthorization}=require('../controller/user');
const {requiredSignin}=require('../controller/auth')
const router=express.Router();


router.get('/users',allUsers);
router.get('/users/:userId',requiredSignin,getUser);
router.put('/users/:userId',requiredSignin,updateUser);
router.delete('/users/:userId',requiredSignin,hasAuthorization,deleteUser);
router.param('userId',userById);

module.exports=router;