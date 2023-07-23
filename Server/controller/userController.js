const User = require('../models/userModel')
const crypto = require('crypto')
// const cloudinary = require("cloudinary");
const cloudinary = require('cloudinary');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv')
dotenv.config()
const {catchAsyncError, errorHandler} = require('../middleware/errorHandler')
const { body, validationResult } = require("express-validator");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sentEmail')

const registerUser =  catchAsyncError(async(req, res)=>{
  

    const{name, email, password} = req.body

    if(!name || !email || !password){
      return errorHandler(res, 400, 'Please, Complete All fields');
    }

        // Email validation using express-validator
        await body("email").isEmail().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorHandler(res, 400, 'Enter a valid Email');
        }

        const isUserExist = await User.findOne({ email: req.body.email });
        if(isUserExist){
            return errorHandler(res, 400, 'User already exist');
        }
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);
        
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "userAvatar",
          width: 150,
          crop: "scale",
        });
    const user  = await User.create({ 
        name,
        email,
        password: securedPassword,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
    })
    
    await user.save()
    sendToken(res, 200, user, 'Your account has been created')
  
})



const loginUser =  async(req, res)=>{


      try {
        const {email, password} = req.body

        if (!email || !password) {
            return errorHandler(res, 400,"Please provide email and password" );
          }
    
            // Email validation using express-validator
            await body("email").isEmail().run(req);
    
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorHandler(res, 400, 'Enter a valid Email');
            }
    
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            return errorHandler(res, 400, 'Please, provide correct credentials');
          } 

            const comparePassword = await bcrypt.compare(password, user.password);   
        
        
        if (!comparePassword) {
          return errorHandler(res, 400, 'Enter Valid Email or Password');
          }

        sendToken(res, 200, user, 'Login Successfully')
         
    
      } 
      
      
      catch (error) {
        console.log(error);
      }
  
}


const logoutUser = catchAsyncError(async (req, res) => {
      res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: true
      });
      // res.clearCookie('token');
      res.status(200).json({ success: true, message: "Logout Successfully" });

  });


  const getMyProfile = catchAsyncError(async (req, res) => {
    const isUserExist = await User.findById(req.user._id)
    if (isUserExist) {
      let user = isUserExist
      // const {password, ...user} = isUserExist
      // const { user: { password, ...userWithoutPassword } } = isUserExist;
      return res.status(200).json({ success: true, user});
    }
    else{
      return errorHandler(res, 400, 'Please, provide correct credentials');
    }

});


const changeUserPassword = catchAsyncError(async (req, res) => {
  const {oldPassword, newPassword} = req.body
  // if(!(oldPassword && newPassword)){
  //   return errorHandler(res, 400, 'Please, Complete All fields');
  // }
  const user = await User.findById(req.user._id)
  if (!user) {
    return errorHandler(res, 400, 'Please, provide correct credentials');
  }
  const comparePassword = await bcrypt.compare(oldPassword, user.password);   
  if (!comparePassword) {
    return errorHandler(res, 400, 'Incorrect Old Password');
  }
  const salt = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(newPassword, salt);

  user.password = securedPassword
  await user.save()
  return res.status(200).json({ success: true, message:"Password Changed Successfully"});

});


const updateProfile = catchAsyncError(async (req, res) => {
  const {name, email} = req.body
  const user = await User.findById(req.user._id)
  if (!user) {
    return errorHandler(res, 400, 'Please, provide correct credentials');
  }

  await body("email").isEmail().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return errorHandler(res, 400, 'Enter a valid Email');
  }
  
  if(name) user.name = name
  if(email) user.email = email
  await user.save()
  return res.status(200).json({ success: true, message:"Profile Updated Successfully"});
});

const updateUserAvatar = catchAsyncError(async (req, res) => {
  // ToDO

  const user = await User.findById(req.user._id)
  if (!user) {
    return errorHandler(res, 400, 'Please, provide correct credentials');
  }


  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "userAvatar",
      width: 150,
      crop: "scale",
    });

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

  await user.save()
  return res.status(200).json({ success: true, message:"Avatar Updated Successfully"});


});



// Forget Password
const forgetUserPassword = catchAsyncError(async (req, res) => {
  const email = req.body
  if(!email) return errorHandler(res, 400, 'Please, Complete All fields');4
  
  const user = await User.findOne(email)
  if (!user) {
    return errorHandler(res, 400, 'No user with this email exist');
  }
  const resetToken = await user.getresetToken()
  await user.save()

  // http://localhost:3000/rest-token/jwrwueur87234jsjf
  const url = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
  const txt = `Click on the given link to reset your password. ${url}, If you haven't request, Please ignore the message
  `

  // sent token via email
  await sendEmail(user.email, "Request for reset token", txt)

  return res.status(200).json({ success: true, message:`Reset Token has been sent to ${user.email}`});

});


// Reset Password Token
const resetUserPassword = catchAsyncError(async (req, res) => {
  const  {resetToken} = req.params
  const addResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")

  const user = await User.findOne({
    resetPasswordToken: addResetToken,
    resetPasswordExpire:{
      $gt: Date.now()
    }
  })
  if (!user) {
    return errorHandler(res, 401, 'Token is not valid or has been expired');
  }

  // if token valid or not expired
  const salt = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = securedPassword
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save()
  return res.status(200).json({ success: true, message: 'Password updated successfully'});

});


module.exports = 
{
registerUser,
loginUser,
logoutUser,
getMyProfile,
changeUserPassword,
updateProfile,
updateUserAvatar,
forgetUserPassword,
resetUserPassword,

}