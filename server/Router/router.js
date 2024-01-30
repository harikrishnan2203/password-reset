const express = require('express')
const router = express.Router()
const SignupController = require('../Controller/signupController')
const LoginController = require("../Controller/loginController")
const ForgotPassController = require("../Controller/forgotPassController")
const UpdatePassController = require("../Controller/udatePassController")

// Authentication routes
router.post('/signup', SignupController.createUser); // Route for user registration
router.post('/login', LoginController.loginUser); // Route for user login

// Password reset routes
router.post('/initiate-password-reset', ForgotPassController.initiatePasswordReset); // Route to initiate password reset
router.post('/update-password/:token', UpdatePassController.updatePassword); // Route to update password using the token


module.exports = router;