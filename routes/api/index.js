const express=require('express');

const router=express.Router();
console.log('api loaded')

router.use('/v1',require('./v1'));
module.exports=router;