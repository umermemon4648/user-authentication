const dotnet = require('dotenv')
dotnet.config()

const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const isAuthenticate = async(req, res, next)=>{
    const {token} = req.cookies
    if (!token) {
        return res.status(404).send({error: "Please Login to access this resource"})
    }
    
    try {
        // use token as "STRING"
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedData.id)
        next()
    } 
    
    catch (error) {
        console.error(error)
           //Incase of expired jwt or invalid token kill the token and clear the cookie
        res.clearCookie("token");
        res.status(500).send({error: "Internal Server error occured"})
    }
}


const authorizeRole = (...roles)=>{
    return (req, res, next) =>{

        // if not of admin
        if (!roles.includes(req.user.role)) {
            return res.status(400).send(`Role: ${req.user.role} is not allowed to access resource`)
        }

        next()
    }
    

}
console.log(process.env.JWT_SECRET)
module.exports = {isAuthenticate, authorizeRole}