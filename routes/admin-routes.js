const express = require('express')
const AuthMiddleware = require('../middleware/Authmiddleware')
const AdminMiddleware = require('../middleware/Adminmiddleware')
const Users = require("../model/Schema")
const AdminRoutes = express.Router()

AdminRoutes.get("/welcome",AuthMiddleware,AdminMiddleware,(req,res)=>{

    res.status(200).json({
        message : "welcome to admin page"
    })


})

AdminRoutes.get("/people", AuthMiddleware ,AdminMiddleware,async (req,res)=>{
    try{
        
        const allusers =  await Users.find({},'-_id username email role')
       
       
        if(allusers.length>0){
            res.status(200).json({
                success : "pass",
                users : allusers
            })
        }
        else{
            res.status(200).json({
                success:"pass",
                nousers : 0,
            })
        }

    

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : 'failed',
            message : "Error fetching list of users"
        })
        
    }
})

module.exports= AdminRoutes