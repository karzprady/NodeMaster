const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,"uploads/")
    },
    filename : function(req,file,cb){
        
        cb(null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }

})



//filefiler

const checkfilefilter =  (req,file,cb)=>{
    
    req.resourceType='image'

    if(file.mimetype.startsWith("image")) {cb(null,true)}
        else if(file.mimetype.startsWith("video")) {req.resourceType = 'video';cb(null,true)}
    
    else{
cb( new Error("not an image"))

    }

}

//create multermiddleware

module.exports =multer({

    storage : storage,
    fileFilter : checkfilefilter,
    limits : {
        fileSize : 1024 * 1024 * 1024
    },
     

}) 