const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    url :{
        type : String,
        required : true
    },
    publicId :{
        type : String,
        required : true
    },
    UploadedBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'AuthUsers',
        required : true
        
    },
    timestamp : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('Images',ImageSchema)