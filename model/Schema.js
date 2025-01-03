const mongoose = require("mongoose")


const Users = new mongoose.Schema({
    username : {
        type  : String,
        required : true,
        trim : true ,
        unique : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true

    },
    password : {
        type : String,
        required : true,

    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
})

module.exports = mongoose.model("AuthUsers",Users)