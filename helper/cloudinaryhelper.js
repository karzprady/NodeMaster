const cloudinary = require('../Config/cloudinaryconfig')

const CloudinaryUpload = async(filepath,resourceType)=>{
    try{
     const result =await cloudinary.uploader.upload(filepath,{
        resource_type: resourceType}
,(err,res)=>{
        if(err)  { console.error(err); return new Error(err)}
        
     })

     return{
        url : result.secure_url,
        publicId : result.public_id

     } 
    }
    catch(e){
        console.log(e);
        
    }
}
module.exports = {
    CloudinaryUpload
}