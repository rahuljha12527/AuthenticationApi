const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    resetLink:{
        data:String,
        default:''
    }
},{
    timestamps:true
});

const user=mongoose.model('User',userSchema);

module.exports=user;
