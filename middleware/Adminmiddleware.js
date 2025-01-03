const express = require("express")

const AdminMiddleware = (req,res,next)=>{
    try{
        const currentrole =req.userInfo.role 
        if(currentrole!=="admin"){
            return res.status(403).json({
                success : 'failed',
                message: "Access denied. admin access required"
            })
             
        }
        next()
        

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : 'failed',
            message : "something went wrong"
        })
        
    }

}

module.exports=AdminMiddleware