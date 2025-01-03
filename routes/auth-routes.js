const express = require('express')
const {Login,Register} = require("../controllers/auth-controller")
const {ChangePassword, VerifyotpandResetPassword, VerifyUserandTriggerOtpMiddleware} = require('../controllers/Changepassword')
const AuthMiddleware = require('../middleware/Authmiddleware')

const router = express.Router()

router.post("/register",Register)
router.post("/login",Login)
router.post("/change-password",AuthMiddleware,ChangePassword)
router.post("/fp",VerifyUserandTriggerOtpMiddleware,VerifyotpandResetPassword)

module.exports = router
