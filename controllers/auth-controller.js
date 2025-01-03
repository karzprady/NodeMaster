const model = require("../model/Schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const Login = async (req,res)=>{
    try{

        const {username,password} =req.body
        const ifValidUser = await model.findOne({username})
        if(!ifValidUser){
            return res.status(404).json({
                message : "user doesnt exists"
            })
        }
        
        
        
        
        const passwordDecryptandCompare= await bcrypt.compare(password,ifValidUser.password)
        if(!passwordDecryptandCompare){
            return res.status(403).json({
                message : "invalid Credentials"
            })
        }

        const accessToken = jwt.sign({
            userId : ifValidUser._id,
            username : ifValidUser.username,
            role : ifValidUser.role,
            
        },process.env.JWT_SECRET_KEY,{
            "expiresIn" : "60m"
        })
        res.cookie('persistent', accessToken, {
            httpOnly: false,   // Cannot be accessed via JavaScript (prevents XSS attacks)
            secure: false,  // Only send over HTTPS in production
           // sameSite: 'None',  // Ensures the cookie is only sent with requests to the same domain
            maxAge: 3600000  // Token will expire in 1 hour
          });
        res.status(200).json({
            message : "user logged in succesfully",
            accessToken
        })

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message : 'Something went wrong',
            
        })
    }

}

const Register = async (req,res)=>{

    try{
         const {username,email,password,role} = req.body
         

         const CheckIfUserExists = await model.findOne({$or:[{username},{email}]})
         if(CheckIfUserExists){
            return res.status(404).json({
                message : 'user already exists'
            })
         }
         const salt = await bcrypt.genSalt(10)
         const hashedpassword = await bcrypt.hash(password,salt)
         const RegisterNewUser = new model({
            username,
            email,
            password : hashedpassword,
            role : role || "user"
         })

         await RegisterNewUser.save()
         res.status(200).json({
            success :'true',
            message : "user registered succesfully"
         })


    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message : 'Something went wrong'
        })
        
    }

}
module.exports = {Login,Register}