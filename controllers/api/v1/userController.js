const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const { use } = require("passport");

module.exports.register = async function (req, res) {
  console.log(req.body);
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.json(200, {
      message: "Please fill all the required filled",
    });
  }

  try {
    await User.findOne(
      {
        email: req.body.email,
      },
      function (err, user) {
        if (err) {
          return res.json(400, {
            message: "Username already exist",
          });
        }

        if (!user) {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          return res.json(200, {
            message: "registerd successfully",
          });
        } else {
          return res.json(400, {
            message: "Username already exist",
          });
        }
      }
    );
  } catch (err) {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username and password",
      });
    }
    return res.json(200, {
      message: "Sign in ,Successfull,here is your token and keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "userApi", {
          expiresIn: "1000000000",
        }),
        user,
      },
    });
  } catch (err) {
    console.log("*********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
//jab login ho jaye tab password change krne hai
//ruko mail dikhata hu

// module.exports.forgotPassword=function(req,res){
//     const {email}=req.body;
//     User.findOne({email},(err,user)=>{
//         if(!err || !user){
//             return res.status(400).json({error:"User with this email does not exists."});
//         }
//         const token=jwt.sign({_id:user._id},{expiresIn:"1000000000"});

//         return user.updateOne({resetLink:token}, function(err,success){
//             if(err){
//                 return res.status(400).json({error:"reset password link error"});
//             }
//             else{

//              }
//         })
//     })
// }

module.exports.resetPassword = async function (req, res) {
  try {
    // console.log(req.user);
    const user = await User.findById(req.user._id);
    console.log(user);
    if (user) {
      user.password = req.body.password;
      await user.save();
    }
    return res.json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
//done but bro password change postman me krne hai 

//ha bro ho gaya bro ek question the ..k 
//jab hum login krte hai tab hume profile show krne hai
//to jo login hai wahi per route ke sath kuh krne parega
//tum bs muh se bta do
//hm aapka que samjhe nh acha ruko me mail dikhate hu
// Get profile API which must have authentication validation at the backend level
//ek profile ka route bna lijiyega./...usko authenticate kijiyega...fir controller me req.user._id se find krke user ko return kr dijiyega,,,
//okay bro thank you bro..wclcm itne koi nahi krte thank you..koi nh..best of liuck okay bye bro
