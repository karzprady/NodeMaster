const express = require('express')
const homerouter = express.Router()

const AuthMiddleware = require("../middleware/Authmiddleware")

homerouter.get("/welcome",AuthMiddleware,(req,res)=>{
    const {username,userId,role} = req.userInfo
    res.json({
        message : "welcome to home page",
        data : {
            userId  ,
            username,
            role
        }
    })
})

module.exports = homerouter