const express = require('express')
const AuthMiddleWare = require("../middleware/Authmiddleware")
const AdminMiddleWare = require("../middleware/Adminmiddleware")
const AdminMiddleware = require('../middleware/Adminmiddleware')
const { UploadController, DeleteImageController, fetchimages } = require('../controllers/upload-controller')
const  UploadMiddleWare = require('../middleware/UploadMiddleware')

const imagerouter = express.Router()

imagerouter.post("/upload",AuthMiddleWare,AdminMiddleware,UploadMiddleWare.single('file'),UploadController)
imagerouter.delete("/delete/:id",AuthMiddleWare,AdminMiddleware,DeleteImageController)
imagerouter.get("/fetchimages",fetchimages)

module.exports = imagerouter