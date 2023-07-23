const crypto = require('crypto')
const mongoose = require('mongoose')
const {Schema} = mongoose

let userSchema  =  new Schema({
    name:
    {type: String, required: true, trim: true},

    email:
    {type: String, required: true, unique: true},

    password:
    // another field select:false --optional 
    {type: String,  required: true,
    // select: false // Exclude password field by default
    },

    resetPasswordToken:
    {type: String},

    resetPasswordExpire:
    {type: String},
    
    avatar:{
        public_id:{type: String, default:'imer'},
        url:{type: String, default:'umer'},
    },


},{timestamps:true})
console.log(crypto.randomBytes(20).toString("hex"));


userSchema.methods.getresetToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now()+ (10*60*1000)

    return resetToken

}

module.exports  = mongoose.model('User', userSchema)