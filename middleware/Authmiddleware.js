const express = require('express')
const jwt = require("jsonwebtoken")
require("dotenv").config()

const AuthMiddleware = (req,res,next)=>{
    try{

    const headers = req.headers["authorization"]
  
    
    const Token = headers && headers.split(" ")[1]
    
    
    if(!Token){
        return res.status(404).json({
            message : 'token not provided'
        })
    }
    const decodeInfo = jwt.verify(Token,process.env.JWT_SECRET_KEY)
    req.userInfo = decodeInfo
    next()
    
    

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : "failed",
            message : "something went wrong"
        })
        
    }
}

module.exports = AuthMiddleware