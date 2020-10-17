const express=require('express');
const router=express.Router();
console.log('v1 loaded')
router.use('/user',require('./user'));





module.exports=router;