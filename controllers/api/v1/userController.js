const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const { use } = require("passport");

module.exports.register = async function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.json(200, {
      message: "Please fill all the required filled",
    });
  }

  try{
    await User.findOne(
        {
            email:req.body.email,
        },
        function(err,user){
            if(err){
                return res.json(400,{
                    message:"Username already exist",
                });
            }

            if(!user){
                User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                });
                return res.json(200,{
                    message:"registerd successfully",
                });
            }else{
                return res.json(400,{
                    message:"Username already exist",
                });
            }
        }
    )
  }catch(err){
     return res.json(500,{
         message:"Internal Server Error"
     })
  }
};

module.exports.login=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid username and password"
            });
        }
        return res.json(200,{
            message:"Sign in ,Succeddfull,here is your token and keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),"userApi",{
                    expiresIn:"1000000000"
                }),
                user,
            },
        });
    }catch(err){
        console.log("*********",err);
        return res.json(500,{
            message:"Internal Server Error",
        });
    }
};



