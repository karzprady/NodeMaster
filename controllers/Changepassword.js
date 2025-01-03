const AuthUsers = require('../model/Schema')
const bcrypt =  require('bcryptjs')
const transporter = require('../email')
const ChangePassword = async (req,res)=>{

    try{
    const userId = req.userInfo.userId

    const {oldpass,newpass} = req.body

    const currentuser = await AuthUsers.findById(userId)

    const checkpasswordmatch = await bcrypt.compare(oldpass,currentuser.password)
    if(!checkpasswordmatch){

       return res.status(403).json({
             success : 'failed',
            message : 'old password doesnt match'
            
        })

    }
    const salt = await bcrypt.genSalt(10)
    const newhashpassword = await bcrypt.hash(newpass,salt)

    currentuser.password = newhashpassword
    await currentuser.save()

    res.status(200).json({
        success : 'pass',
        message : "password changed succesfully"
    })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : 'failed',
            message : 'something went wrong'
        })
        
    }


}

const VerifyUserandTriggerOtpMiddleware = async(req,res,next)=>{
    try{
        const {username}=req.body
        const otp = Number("094561")
        // const {userId} = req.userInfo

        //check user presence in db

        const CheckIfUserExists= await AuthUsers.findOne({username : username})
        
        
        if(!CheckIfUserExists) return res.status(400).json({
            status : 'failed',
            message : 'usernot found'
        })
        
        req.actualotp = otp
        req.currentuser = CheckIfUserExists._id
        if(req.body.otp) {
           
            return next()}

        //check if oldpassword matches or not


        //send otp email
       

        const mailOptions={
            from : process.env.GMAIL_USER,
            to : CheckIfUserExists.email ,
            subject : "KARZ CMS OTP" ,
            html : `<h4>${otp}<h2>`,
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err) { return console.log(err);}
            else { console.log('Email Sent' ,info.response.json());
            }
            
        })

        req.currentstatus = "otpsent"
        
        
        // res.status(200).json({
        //     message : "otpsent"
        // })
    
    
       next()



    }
    catch(e){
        console.log(e);
        res.status(500).json({
            status : 'failed',
            message : 'something went wrong'
        })
        
    }
}

const VerifyotpandResetPassword = async(req,res)=>{
    try{
        const {actualotp,currentuser} = req
        const {otp,newpass} = req.body
        console.log(typeof otp, typeof actualotp);

        if(req.currentstatus==="otpsent") 
            return res.status(201).json({
            message : req.currentstatus
        }
      
        
    

        )
        
        else if(otp!==actualotp){

            return res.status(400).json({
                success : "failed",
                message : "otp doesnt match"
            })
       
            

        }
        

        const salt = await bcrypt.genSalt(10)
            const newhashpassword = await bcrypt.hash(newpass,salt)

            const newuserdetail = await AuthUsers.findById(currentuser)

            newuserdetail.password = newhashpassword
            await newuserdetail.save()

             res.status(200).json({
                success : "pass",
                message : "password updated"
            })


    }
    catch(e)

    {
        console.log(e);
        res.status(500).json({
            status : 'failed',
            message : 'something went wrong'
        })

        

    }

}

module.exports = {ChangePassword,VerifyUserandTriggerOtpMiddleware,VerifyotpandResetPassword}