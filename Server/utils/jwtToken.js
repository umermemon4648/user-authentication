const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken');

const sendToken = (res, statusCode, user, message) => {

const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

 
//   cookies features
const options = {
    expires: new Date(Date.now() + 2*24*60*60*1000),
    httpOnly: true,
    sameSite: true
}
res.cookie()
res.status(statusCode).cookie("token", jwtToken, options)
.json({
    success: true,
    message,
    user,
    jwtToken,

})
};

console.log(process.env.JWT_SECRET)
console.log(process.env.JWT_EXPIRE)


module.exports = sendToken