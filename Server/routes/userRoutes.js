const express = require('express')
const router = express.Router()
const {registerUser, loginUser,logoutUser, getMyProfile,changeUserPassword, updateProfile, forgetUserPassword, resetUserPassword, updateUserAvatar} = require('../controller/userController')
const {isAuthenticate} = require('../middleware/auth')

// Register a user
router.post('/newUser',registerUser)
// Login
router.post('/loginUser',loginUser)
// Logout
router.post('/logoutUser',logoutUser)
// get my profile
router.get('/me', isAuthenticate ,getMyProfile)

// change password
router.put('/change-password', isAuthenticate ,changeUserPassword)
// Update Profile
router.put('/update-profile', isAuthenticate ,updateProfile)
// Update Usera Avatar
router.put('/update-user-avatar', isAuthenticate ,updateUserAvatar)
// Forget Password
router.post('/forgot-password', forgetUserPassword)
// Reset Password
router.put('/reset-password/:resetToken', resetUserPassword)





module.exports = router