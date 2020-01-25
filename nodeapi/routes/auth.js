const express=require('express');
const {signup,signin,signout}=require('../controller/auth');
const {userById}=require('../controller/user');
const router=express.Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.param('UserId',userById);

module.exports=router;
